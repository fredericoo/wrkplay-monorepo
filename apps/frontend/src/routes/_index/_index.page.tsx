import { useLoaderData } from 'react-router-typesafe';
import { match } from 'ts-pattern';

import { MessageView } from '~/domains/common/components/message-view';

import type { indexLoader } from './_index.loader';

export const IndexPage = () => {
	const { matches } = useLoaderData<typeof indexLoader>();

	return (
		<div className="container py-8">
			{match(matches)
				.with([], () => <MessageView heading="No matches" headingLevel="h1" />)
				.otherwise(matches => (
					<ol>
						{matches.map(match => (
							<li key={match.id}>{match.id}</li>
						))}
					</ol>
				))}
		</div>
	);
};
