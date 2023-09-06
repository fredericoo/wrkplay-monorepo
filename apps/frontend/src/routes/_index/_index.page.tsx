import { Skeleton } from '@wrkplay/ui';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useLoaderData } from 'react-router-typesafe';
import { match } from 'ts-pattern';

import { Deferred } from '~/domains/common/components';
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
				<h1 className="display-2xs">All recent matches</h1>

				<Deferred
					data={matches}
					loadingElement={<MatchesSkeleton count={4} />}
					errorElement={<ErrorView heading="Error loading matches" />}
				>
					{matches => (
						<div className="flex flex-col gap-8">
							{match(matches.status)
								.with('fresh', () => (
									<p className="flex items-center gap-2 rounded-2 bg-background-subtle-warning px-3 py-2 text-copy-highcontrast-warning ring-1 ring-border-subtle-warning">
										<IoInformationCircleOutline className="h-6 w-6 text-icon-highcontrast-warning" />
										<span className="body-sm">This list may be out of date, please refresh to try again.</span>
									</p>
								))
								.otherwise(() => null)}
							{match(matches.data)
								.with([], () => (
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
				</Deferred>
			</section>
		</div>
	);
};
