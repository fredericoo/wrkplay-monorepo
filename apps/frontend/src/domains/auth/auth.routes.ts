import type { RouteObject } from 'react-router-dom';

import { LoginPage } from '~/domains/auth/routes/login.page';
import { logoutAction } from '~/domains/auth/routes/logout.action';
import { logoutLoader } from '~/domains/auth/routes/logout.loader';
import { LogoutPage } from '~/domains/auth/routes/logout.page';

export const authRoutes: RouteObject[] = [
	{
		path: '/login',
		Component: LoginPage,
	},
	{ path: '/logout', loader: logoutLoader, Component: LogoutPage, action: logoutAction },
];
