import { Form } from 'react-router-dom';
import { match } from 'ts-pattern';

import type { api } from '~/domains/api/api.client';
import { MessageView } from '~/domains/common/components/message-view';

import { UserAvatar } from '.';

type UserListProps = {
	users: Awaited<ReturnType<typeof api.user.list.query>>;
};
export const UserList = ({ users }: UserListProps) => {
	return match(users)
		.with([], () => <MessageView heading="No users" headingLevel="h1" />)
		.otherwise(users => (
			<Form method="POST">
				<ol className="flex flex-col gap-4 rounded-4 border border-border-subtle-neutral bg-background-subtle-neutral p-4">
					{users.map(user => (
						<li className="flex items-center gap-2" key={user.id}>
							<UserAvatar user={user} /> <span className="flex-grow truncate label-md">{user.name}</span>{' '}
						</li>
					))}
				</ol>
			</Form>
		));
};
