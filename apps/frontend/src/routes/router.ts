import { createBrowserRouter } from 'react-router-dom';

import { authPages } from '~/domains/auth/auth.routes';
import { AuthLayout } from '~/domains/auth/routes/_auth.layout';
import { authLoader } from '~/domains/auth/routes/_auth.loader';
import { NavigationLayout } from '~/domains/common/components/navigation-layout';
import { RootLayout } from '~/domains/common/routes/_root.layout';
import { rootLoader } from '~/domains/common/routes/_root.loader';
import { ErrorView } from '~/domains/error/components';
import { userPages } from '~/domains/user/user.routes';
import { venuePages } from '~/domains/venue/venue.routes';
import { indexAction } from '~/routes/_index/_index.action';
import { indexLoader } from '~/routes/_index/_index.loader';
import { IndexPage } from '~/routes/_index/_index.page';
import { joinMatchAction } from '~/routes/join-match/join-match.action';
import { JoinMatchPage } from '~/routes/join-match/join-match.page';
import { matchAction } from '~/routes/match.$matchId/match.$matchId.action';
import { matchLoader } from '~/routes/match.$matchId/match.$matchId.loader';
import { MatchPage } from '~/routes/match.$matchId/match.$matchId.page';

export const router = createBrowserRouter([
	{
		id: 'root',
		loader: rootLoader,
		Component: RootLayout,
		children: [
			...authPages,
			{
				id: 'auth',
				ErrorBoundary: ErrorView,
				loader: authLoader,
				Component: AuthLayout,
				shouldRevalidate: ({ formAction }) => {
					return formAction === '/settings';
				},
				children: [
					{
						Component: NavigationLayout,
						children: [
							{
								path: '/',
								loader: indexLoader,
								action: indexAction,
								ErrorBoundary: ErrorView,
								Component: IndexPage,
							},
							{ path: '/join-match', Component: JoinMatchPage, action: joinMatchAction },
							...venuePages,
							...userPages,
						],
					},
					{ path: '/match/:matchId', loader: matchLoader, Component: MatchPage, action: matchAction },
					{ path: '/terms', lazy: () => import('./terms/index') },
				],
			},
		],
	},
]);
