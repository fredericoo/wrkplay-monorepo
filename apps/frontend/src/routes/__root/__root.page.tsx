import { Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';

import { Navbar } from '~/domains/common/components/navbar';

import type { rootLoader } from './__root.loader';

export const RootPage = () => {
	const { user } = useLoaderData<typeof rootLoader>();
	return (
		<div className="flex-grow">
			<Navbar user={user} />
			<Outlet />
		</div>
	);
};
