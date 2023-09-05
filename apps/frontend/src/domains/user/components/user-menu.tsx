import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@wrkplay/ui';
import { IoLogOutOutline } from 'react-icons/io5';
import { Form } from 'react-router-dom';

import { UserAvatar } from '~/domains/user/components';

export type UserMenuProps = {
	user: { name: string; avatar_url?: string | null };
};

export const UserMenu = ({ user }: UserMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="focus:outline-none">
				<UserAvatar user={user} />
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="end" className="flex w-56 flex-col gap-1">
				<div className="overflow-hidden p-2">
					<p className="truncate label-sm">{user.name}</p>
				</div>

				<hr className="border-border-subtle-neutral" />

				<Form action="/logout" method="post">
					<DropdownMenuItem asChild>
						<button type="submit" className="hover:!bg-destructive-foreground hover:!text-destructive w-full">
							<IoLogOutOutline className="mr-2 h-6 w-6" />
							<span>Sign out</span>
						</button>
					</DropdownMenuItem>
				</Form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
