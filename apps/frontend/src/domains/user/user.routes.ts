import type { RouteObject } from 'react-router-dom';

import { ErrorView } from '~/domains/error/components';
import { meLoader } from '~/domains/user/routes/me.loader';
import { MePage } from '~/domains/user/routes/me.page';
import { SettingsPage } from '~/domains/user/routes/settings.page';
import { usersAction } from '~/domains/user/routes/users.action';
import { usersLoader } from '~/domains/user/routes/users.loader';
import { UsersPage } from '~/domains/user/routes/users.page';

export const userPages: RouteObject[] = [
	{
		path: '/me',
		Component: MePage,
		loader: meLoader,
	},
	{
		path: '/users',
		loader: usersLoader,
		action: usersAction,
		ErrorBoundary: ErrorView,
		Component: UsersPage,
	},
	{
		path: '/settings',
		Component: SettingsPage,
	},
];
