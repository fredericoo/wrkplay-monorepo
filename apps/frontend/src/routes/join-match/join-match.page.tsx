import { Button, Input } from '@wrkplay/ui';
import { AnimatePresence, motion } from 'framer-motion';
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
		<div className="container flex flex-col items-center gap-8 py-8">
			<section className="flex w-full max-w-md flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="text-center heading-lg">Join Match</h1>
					<p className="text-center text-copy-lowcontrast-neutral body-md">Scan the NFC tag or enter its code below:</p>
				</div>

				<Form className="flex flex-col gap-3" method="POST">
					<Input
						autoCapitalize="off"
						autoComplete="off"
						autoCorrect="off"
						autoFocus
						name="joinTag"
						placeholder="Enter code"
					/>
					<div className="flex gap-1">
						<Button asChild className="flex-1" intent="ghost">
							<Link to="/">Cancel</Link>
						</Button>
						<Button className="flex-1" intent="primary">
							Join
						</Button>
					</div>
				</Form>

				{JSON.stringify(response)}
			</section>

			<AnimatePresence>
				<Deferred data={pendingMatches} errorElement={null} loadingElement={null}>
					{pendingMatches => {
						if (pendingMatches.length === 0) return null;
						return (
							<motion.section
								key="leftoff"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className="flex w-full max-w-md flex-col gap-4"
							>
								<div className="flex items-center gap-2">
									<div className="h-[1px] flex-1 bg-border-subtle-neutral" />
									<p className="flex-shrink-0 text-center text-copy-lowcontrast-neutral body-sm">or</p>
									<div className="h-[1px] flex-1 bg-border-subtle-neutral" />
								</div>
								<h2 className="text-center heading-md">continue where you left off</h2>
								<ul className="flex flex-col gap-2">
									{pendingMatches.map(match => (
										<li
											key={match.id}
											className="flex items-center gap-4 rounded-4 border border-border-subtle-neutral bg-background-subtle-neutral px-5 py-4"
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
							</motion.section>
						);
					}}
				</Deferred>
			</AnimatePresence>
		</div>
	);
};
