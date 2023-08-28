import { Button } from '@wrkplay/ui';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';
import { match } from 'ts-pattern';

import { MessageView } from '~/domains/common/components/message-view';
import { HistoricalMatch } from '~/domains/match/components/historical-match';

import type { indexLoader } from './_index.loader';

export const IndexPage = () => {
	const { matches } = useLoaderData<typeof indexLoader>();

	return (
		<div className="container flex flex-col items-center gap-8 py-8">
			<Button intent="primary" asChild>
				<Link to="/join-match">Join match</Link>
			</Button>

			<h1 className="heading-lg">Recent matches</h1>
			{match(matches)
				.with([], () => (
					<MessageView
						heading="Ready for the first match"
						headingLevel="h1"
						message="Played matches will appear here"
					/>
				))
				.otherwise(matches => (
					<ol className="flex w-full max-w-md flex-col gap-4">
						{matches.map(match => (
							<li key={match.id}>
								<HistoricalMatch match={match} />
							</li>
						))}
					</ol>
				))}
		</div>
	);
};
