import { useRouteLoaderData } from 'react-router-dom';
import type { useLoaderData } from 'react-router-typesafe';

import type { authLoader } from '~/domains/auth/routes/_auth.loader';

export const useAuth = () => useRouteLoaderData('auth') as ReturnType<typeof useLoaderData<typeof authLoader>>;
