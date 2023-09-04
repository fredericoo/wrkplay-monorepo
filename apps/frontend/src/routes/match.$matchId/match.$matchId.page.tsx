import { Button } from '@wrkplay/ui';
import { useEffect } from 'react';
import { IoArrowBack, IoBanOutline, IoSkull } from 'react-icons/io5';
import { Form, Link, useRouteLoaderData, useSubmit } from 'react-router-dom';
import { useActionData, useLoaderData } from 'react-router-typesafe';
import { match, P } from 'ts-pattern';

import { groupBy } from '~/domains/common/common.utils';
import { MessageView } from '~/domains/common/components/message-view';
import { InlineError } from '~/domains/error/components/inline-error';
import { MatchJoinSide } from '~/domains/match/components/match-join-side';
import { TeamScore } from '~/domains/match/components/team-score';

import type { rootLoader } from '../__root/__root.loader';
import type { matchAction } from './match.$matchId.action';
import type { matchLoader } from './match.$matchId.loader';

export const MatchPage = () => {
	const { user } = useRouteLoaderData('root') as ReturnType<typeof useLoaderData<typeof rootLoader>>;
	const { match: currentMatch } = useLoaderData<typeof matchLoader>();
	const playersBySide = groupBy(currentMatch.players, x => x.side);
	const me = currentMatch.players.find(x => x.user.id === user.id);
	if (!me) throw new Error('You’re not in this match');

	const submit = useSubmit();
	useEffect(() => {
		const interval = setInterval(() => {
			submit(null, { replace: true });
		}, 1000);
		return () => clearInterval(interval);
	});

	const response = useActionData<typeof matchAction>();

	return match(currentMatch)
		.with({ status: 'NOT_STARTED' }, () => {
			const areAllPlayersReady = currentMatch.players.every(x => x.state === 'READY');
			const isThereEnoughPlayers = currentMatch.players.length >= 2;
			const maxPlayersPerSide = Math.max(playersBySide.SIDE_A?.length ?? 0, playersBySide.SIDE_B?.length ?? 0);
			return (
				<div className="container flex max-w-md flex-grow flex-col gap-4 py-4">
					<div className="flex flex-grow flex-col gap-8 pt-safe-top">
						<MatchJoinSide
							teamSize={maxPlayersPerSide}
							className="flex-1"
							label="Side A"
							players={playersBySide.SIDE_A}
						/>
						<MatchJoinSide
							teamSize={maxPlayersPerSide}
							className="flex-1"
							label="Side B"
							players={playersBySide.SIDE_B}
						/>
					</div>

					{match(response)
						.with({ error: { message: P.string } }, match => <InlineError>{match.error.message}</InlineError>)
						.otherwise(() => null)}

					<Form method="POST" className="flex items-center justify-center gap-2 pb-safe-bottom">
						<input type="hidden" name="matchPlayerId" value={me.id} />

						<Button name="intent" intent="ghost" value="leave">
							<IoArrowBack />
							Leave
						</Button>

						<Button
							className="flex-1"
							name="intent"
							intent={me.state === 'READY' ? 'secondary' : 'positive'}
							value="ready"
						>
							{me.state === 'READY' ? 'Not Ready' : 'Ready'}
						</Button>

						<Button
							className="flex-1"
							type="submit"
							name="intent"
							value="start"
							intent="primary"
							disabled={!areAllPlayersReady || !isThereEnoughPlayers}
						>
							Start match
						</Button>
					</Form>
				</div>
			);
		})
		.with({ status: 'STARTED' }, () => {
			return (
				<div className="container flex flex-grow flex-col gap-4 py-4">
					<div className="grid flex-grow gap-4 pt-safe-top text-center md:grid-cols-2">
						<div
							aria-label="Side A"
							className="flex flex-col items-center rounded-6 border border-border-subtle-neutral bg-background-subtle-neutral px-4 py-2"
						>
							<ul aria-label="Side A Players" className="flex w-full flex-wrap items-center justify-center label-md">
								{playersBySide.SIDE_A?.map(player => <li key={player.id}>{player.user.name}</li>)}
							</ul>
							<TeamScore
								className="w-full flex-grow"
								score={currentMatch.sideAScore}
								side="SIDE_A"
								controls={me.side === 'SIDE_A'}
							/>
						</div>
						<div
							aria-label="Side B"
							className="flex flex-col items-center rounded-6 border border-border-subtle-neutral bg-background-subtle-neutral px-4 py-2"
						>
							<ul aria-label="Side B Players" className="flex w-full flex-wrap items-center justify-center label-md">
								{playersBySide.SIDE_B?.map(player => <li key={player.id}>{player.user.name}</li>)}
							</ul>
							<TeamScore
								className="w-full flex-grow"
								score={currentMatch.sideBScore}
								side="SIDE_B"
								controls={me.side === 'SIDE_B'}
							/>
						</div>
					</div>
					{match(response)
						.with({ error: { message: P.string } }, match => <InlineError>{match.error.message}</InlineError>)
						.otherwise(() => null)}

					<Form method="POST" className="flex justify-center gap-2 pb-safe-bottom">
						<Button className="flex-1 truncate" type="submit" name="intent" value="end" intent="positive">
							Finish
						</Button>
						<Button className="flex-1" disabled intent="secondary">
							<IoBanOutline className="flex-shrink-0" /> <span className="truncate">Cancel</span>
						</Button>
						<Button className="flex-1" disabled intent="negative">
							<IoSkull className="flex-shrink-0" /> <span className="truncate">Forfeit</span>
						</Button>
					</Form>
				</div>
			);
		})
		.with({ status: 'FINISHED' }, () => (
			<MessageView className="flex-grow" heading="that’s it!" headingLevel="h1" message="This match has finished.">
				<Button intent="secondary" asChild>
					<Link to="/">Back to home</Link>
				</Button>
			</MessageView>
		))
		.exhaustive();
};
