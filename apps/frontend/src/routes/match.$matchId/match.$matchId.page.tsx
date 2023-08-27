import { Button } from '@wrkplay/ui';
import { useEffect } from 'react';
import { IoArrowDown, IoArrowUp, IoBanOutline, IoSkull } from 'react-icons/io5';
import { Form, useSubmit } from 'react-router-dom';
import { useActionData, useLoaderData } from 'react-router-typesafe';
import { match } from 'ts-pattern';

import { groupBy } from '~/domains/common/common.utils';
import { MessageView } from '~/domains/common/components/message-view';
import { MatchPlayerRow } from '~/domains/match/components/match-player-row';

import type { matchAction } from './match.$matchId.action';
import type { matchLoader } from './match.$matchId.loader';

export const MatchPage = () => {
	const { match: currentMatch, userId } = useLoaderData<typeof matchLoader>();
	const playersBySide = groupBy(currentMatch.players, x => x.side);
	const me = currentMatch.players.find(x => x.user.id === userId);
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

			return (
				<div className="container flex flex-col gap-8 py-8">
					<div className="grid gap-8 md:grid-cols-2">
						<div>
							<h2 className="heading-lg">Side A</h2>
							<ul>
								{playersBySide.SIDE_A?.map(player => (
									<li key={player.user.id}>
										<MatchPlayerRow player={player} />
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="heading-lg">Side B</h2>
							<ul>
								{playersBySide.SIDE_B?.map(player => (
									<li key={player.user.id}>
										<MatchPlayerRow player={player} />
									</li>
								))}
							</ul>
						</div>
					</div>

					<aside className="flex items-center gap-2">
						<Form method="POST">
							<input type="hidden" name="matchPlayerId" value={me.id} />
							<Button name="intent" intent={me.state === 'READY' ? 'secondary' : 'primary'} value="ready">
								{me.state === 'READY' ? 'Not Ready' : 'Ready'}
							</Button>
						</Form>

						{areAllPlayersReady && (
							<Form method="POST">
								<Button type="submit" name="intent" value="start" intent="primary">
									Start match
								</Button>
							</Form>
						)}
					</aside>
					{JSON.stringify(response)}
				</div>
			);
		})
		.with({ status: 'STARTED' }, () => {
			const scores = {
				me: me.side === 'SIDE_A' ? currentMatch.sideAScore : currentMatch.sideBScore,
				opponent: me.side === 'SIDE_A' ? currentMatch.sideBScore : currentMatch.sideAScore,
			};

			return (
				<div className="container flex flex-grow flex-col gap-8 py-8">
					<div className="grid flex-grow place-content-center gap-8 text-center md:grid-cols-2">
						<div aria-label="Side A" className="flex flex-col items-center">
							<ul>
								{playersBySide.SIDE_A?.map(player => (
									<li key={player.id}>
										<MatchPlayerRow omitStates={['READY']} player={player} />
									</li>
								))}
							</ul>
							<p className="display-sm">{scores.opponent}</p>
						</div>
						<div aria-label="Side B" className="flex flex-col items-center">
							<ul>
								{playersBySide.SIDE_B?.map(player => (
									<li key={player.id}>
										<MatchPlayerRow omitStates={['READY']} player={player} />
									</li>
								))}
							</ul>
							<div className="flex items-center gap-4">
								<Button intent="negative" size="icon">
									<IoArrowDown />
								</Button>
								<p className="display-sm">{scores.me}</p>
								<Button intent="positive" size="icon">
									<IoArrowUp />
								</Button>
							</div>
						</div>
					</div>
					<Form method="POST" className="flex justify-center gap-2">
						<Button type="submit" name="intent" value="end" intent="positive">
							Finish
						</Button>
						<Button disabled intent="secondary">
							<IoBanOutline /> Cancel
						</Button>
						<Button disabled intent="negative">
							<IoSkull /> Forfeit
						</Button>
					</Form>
					{JSON.stringify(response)}
				</div>
			);
		})
		.with({ status: 'FINISHED' }, () => (
			<MessageView heading="Match Finished" headingLevel="h1" message="This match has finished." />
		))
		.exhaustive();
};
