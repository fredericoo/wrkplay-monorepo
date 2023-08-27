import { useLoaderData } from 'react-router-typesafe';

import { UserList } from '~/domains/user/components';

import type { usersLoader } from './users.loader';

export const UsersPage = () => {
	const { users } = useLoaderData<typeof usersLoader>();

	return (
		<div className="container py-8">
			<UserList users={users} />
		</div>
	);
};
