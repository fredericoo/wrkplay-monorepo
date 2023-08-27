import { createBrowserRouter } from 'react-router-dom';

import { ErrorView } from '~/domains/error/components';
import { rootLoader } from '~/routes/__root/__root.loader';
import { RootPage } from '~/routes/__root/__root.page';
import { indexLoader } from '~/routes/_index/_index.loader';
import { IndexPage } from '~/routes/_index/_index.page';
import { joinMatchAction } from '~/routes/join-match/join-match.action';
import { joinMatchLoader } from '~/routes/join-match/join-match.loader';
import { JoinMatchPage } from '~/routes/join-match/join-match.page';
import { matchAction } from '~/routes/match.$matchId/match.$matchId.action';
import { matchLoader } from '~/routes/match.$matchId/match.$matchId.loader';
import { MatchPage } from '~/routes/match.$matchId/match.$matchId.page';
import { usersAction } from '~/routes/users/users.action';
import { usersLoader } from '~/routes/users/users.loader';
import { UsersPage } from '~/routes/users/users.page';

export const router = createBrowserRouter([
	{
		id: 'root',
		ErrorBoundary: ErrorView,
		loader: rootLoader,
		Component: RootPage,
		shouldRevalidate: ({ formAction }) => {
			return formAction === '/users';
		},
		children: [
			{
				path: '/',
				loader: indexLoader,
				ErrorBoundary: ErrorView,
				Component: IndexPage,
			},
			{
				path: '/users',
				loader: usersLoader,
				action: usersAction,
				ErrorBoundary: ErrorView,
				Component: UsersPage,
			},
			{ path: '/join-match', loader: joinMatchLoader, Component: JoinMatchPage, action: joinMatchAction },
			{ path: '/match/:matchId', loader: matchLoader, Component: MatchPage, action: matchAction },
		],
	},
]);
