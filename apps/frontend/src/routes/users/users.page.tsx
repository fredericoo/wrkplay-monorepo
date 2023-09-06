import { useLoaderData } from 'react-router-typesafe';

import { Deferred } from '~/domains/common/components';
import { ErrorView } from '~/domains/error/components';
import { UserList } from '~/domains/user/components';

import type { usersLoader } from './users.loader';

export const UsersPage = () => {
	const { users } = useLoaderData<typeof usersLoader>();

	return (
		<div className="container flex flex-grow flex-col items-center py-8">
			<div className="w-full max-w-md">
				<Deferred data={users} loadingElement={null} errorElement={<ErrorView heading="Couldn’t load users" />}>
					{users => <UserList users={users} />}
				</Deferred>
			</div>
		</div>
	);
};
