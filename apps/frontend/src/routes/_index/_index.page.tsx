import { Button, Skeleton } from '@wrkplay/ui';
import { IoInformationCircleOutline, IoRefresh } from 'react-icons/io5';
import { Form } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';
import { match, P } from 'ts-pattern';

import { SWR } from '~/domains/common/components';
import { MessageView } from '~/domains/common/components/message-view';
import { ErrorView } from '~/domains/error/components';
import { HistoricalMatch } from '~/domains/match/components/historical-match';

import type { indexLoader } from './_index.loader';

const MatchesSkeleton = (props: { count: number }) => {
	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			{new Array(props.count).fill(null).map((_, i) => (
				<Skeleton key={i} className="relative h-28 rounded-4">
					<Skeleton className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-interactive-element-active-neutral" />
				</Skeleton>
			))}
		</div>
	);
};

export const IndexPage = () => {
	const { matches } = useLoaderData<typeof indexLoader>();

	return (
		<div className="container flex flex-col items-center gap-8 py-8">
			<section className="flex w-full max-w-md flex-col gap-8">
				<header className="flex gap-4">
					<h1 className="flex-grow truncate display-2xs">All recent matches</h1>
					<Form method="POST">
						<Button size="icon" aria-label="Refresh" intent="ghost" type="submit">
							<IoRefresh />
						</Button>
					</Form>
				</header>

				<SWR
					data={matches}
					loadingElement={<MatchesSkeleton count={4} />}
					errorElement={<ErrorView heading="Error loading matches" />}
				>
					{matches => (
						<div className="flex flex-col gap-8">
							{match(matches?.status)
								.with('stale-error', () => (
									<p className="flex items-center gap-2 rounded-2 bg-background-subtle-warning px-3 py-2 text-copy-highcontrast-warning ring-1 ring-border-subtle-warning">
										<IoInformationCircleOutline className="h-6 w-6 text-icon-highcontrast-warning" />
										<span className="body-sm">This list may be out of date, please refresh to try again.</span>
									</p>
								))
								.otherwise(() => null)}
							{match(matches?.data)
								.with(P.union(P.nullish, []), () => (
									<MessageView
										headingLevel="h1"
										heading="Ready for the first match"
										message="Played matches will appear here"
									/>
								))
								.otherwise(matches => (
									<ol className="flex w-full max-w-md flex-col gap-6">
										{matches.map(match => (
											<li key={match.id}>
												<HistoricalMatch match={match} />
											</li>
										))}
									</ol>
								))}
						</div>
					)}
				</SWR>
			</section>
		</div>
	);
};
