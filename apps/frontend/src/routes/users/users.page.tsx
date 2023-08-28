import { useLoaderData } from 'react-router-typesafe';

import { UserList } from '~/domains/user/components';

import type { usersLoader } from './users.loader';

export const UsersPage = () => {
	const { users } = useLoaderData<typeof usersLoader>();

	return (
		<div className="container flex flex-grow flex-col items-center py-8">
			<div className="w-full max-w-md">
				<UserList users={users} />
			</div>
		</div>
	);
};
