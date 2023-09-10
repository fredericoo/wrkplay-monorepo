import { IoInformationCircleOutline } from 'react-icons/io5';
import { useLoaderData } from 'react-router-typesafe';
import { match, P } from 'ts-pattern';

import { MessageView, SWR } from '~/domains/common/components';
import { ErrorView } from '~/domains/error/components';
import { VenueCard } from '~/domains/venue/components';
import type { venuesLoader } from '~/domains/venue/routes/venues.loader';

export const VenuesPage = () => {
	const { venues } = useLoaderData<typeof venuesLoader>();

	return (
		<div className="container flex flex-grow flex-col items-center py-8">
			<div className="w-full max-w-md">
				<SWR
					data={venues}
					loadingElement={<div>loading</div>}
					errorElement={<ErrorView heading="Error loading venues" />}
				>
					{venues => (
						<div className="flex flex-col gap-8">
							{match(venues?.status)
								.with('stale-error', () => (
									<p className="flex items-center gap-2 rounded-2 bg-background-subtle-warning px-3 py-2 text-copy-highcontrast-warning ring-1 ring-border-subtle-warning">
										<IoInformationCircleOutline className="h-6 w-6 text-icon-highcontrast-warning" />
										<span className="body-sm">This list may be out of date, please refresh to try again.</span>
									</p>
								))
								.otherwise(() => null)}
							{match(venues?.data)
								.with(P.union(P.nullish, []), () => (
									<MessageView
										headingLevel="h1"
										heading="No venues yet"
										message="You’ll see venues when they register here. Check back soon!"
									/>
								))
								.otherwise(venues => (
									<ol className="flex w-full max-w-md flex-col gap-6">
										{venues.map(venue => (
											<li key={venue.id}>
												<VenueCard venue={venue} />
											</li>
										))}
									</ol>
								))}
						</div>
					)}
				</SWR>
			</div>
		</div>
	);
};
