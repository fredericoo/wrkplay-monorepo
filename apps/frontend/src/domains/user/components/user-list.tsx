import { Button } from '@wrkplay/ui';
import { Form } from 'react-router-dom';
import { match } from 'ts-pattern';

import type { api } from '~/domains/api/api.client';
import { MessageView } from '~/domains/common/components/message-view';

type UserListProps = {
	users: Awaited<ReturnType<typeof api.user.list.query>>;
};
export const UserList = ({ users }: UserListProps) => {
	return match(users)
		.with([], () => <MessageView heading="No users" headingLevel="h1" />)
		.otherwise(users => (
			<ol className="flex flex-col gap-2">
				<Form method="POST">
					{users.map(user => (
						<li className="flex items-center gap-2" key={user.id}>
							<span>{user.name}</span>{' '}
							<Button type="submit" name="userId" value={user.id} size="md" intent="secondary">
								Impersonate
							</Button>
						</li>
					))}
				</Form>
			</ol>
		));
};
