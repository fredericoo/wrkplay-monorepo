import { Button, Input } from '@wrkplay/ui';
import { IoArrowForward } from 'react-icons/io5';
import { Form, Link } from 'react-router-dom';
import { useActionData, useLoaderData } from 'react-router-typesafe';

import { Deferred } from '~/domains/common/components';
import { getRelativeTimeDifference } from '~/domains/format/format.date';

import type { joinMatchAction } from './join-match.action';
import type { joinMatchLoader } from './join-match.loader';

export const JoinMatchPage = () => {
	const { pendingMatches } = useLoaderData<typeof joinMatchLoader>();
	const response = useActionData<typeof joinMatchAction>();
	const timeAtRender = new Date();

	return (
		<div className="container flex flex-col items-center gap-4 py-8">
			<div className="flex w-full max-w-md flex-col gap-2">
				<h1 className="text-center heading-md">Join Match</h1>

				<p className="text-center body-md">Scan the NFC tag or enter its code below:</p>
				<Form className="flex flex-col gap-2" method="POST">
					<Input
						autoCapitalize="off"
						autoComplete="off"
						autoCorrect="off"
						autoFocus
						name="joinTag"
						placeholder="Enter code"
					/>
					<Button intent="primary">Join</Button>
				</Form>

				{JSON.stringify(response)}
			</div>

			<Deferred data={pendingMatches} errorElement={null} loadingElement={null}>
				{pendingMatches => {
					if (pendingMatches.length === 0) return null;
					return (
						<div className="flex w-full max-w-md flex-col gap-4">
							<p className="text-center text-copy-lowcontrast-neutral body-sm">or</p>
							<h2 className="text-center heading-md">continue where you left off</h2>
							<ul className="flex flex-col gap-2">
								{pendingMatches.map(match => (
									<li
										key={match.id}
										className="flex items-center gap-4 rounded-lg border border-border-subtle-neutral bg-background-subtle-neutral px-6 py-4"
									>
										<div className="flex-grow overflow-hidden">
											<p className="truncate label-md">
												{match.pitch.name} at {match.pitch.venue.name}
											</p>
											<p className="truncate text-copy-lowcontrast-neutral body-sm">
												started <time>{getRelativeTimeDifference({ from: timeAtRender, to: match.createdAt })}</time>
											</p>
										</div>
										<Button intent="primary" asChild>
											<Link to={`/match/${match.id}`}>
												Continue <IoArrowForward />
											</Link>
										</Button>
									</li>
								))}
							</ul>
						</div>
					);
				}}
			</Deferred>
		</div>
	);
};
