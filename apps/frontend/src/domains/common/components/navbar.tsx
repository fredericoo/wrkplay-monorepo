import { Button } from '@wrkplay/ui';
import { Link } from 'react-router-dom';

import { UserAvatar } from '~/domains/user/components';

import Logo from '../../../assets/logo.png';

type NavbarProps = {
	user: { name: string } | null;
};

export const Navbar = ({ user }: NavbarProps) => {
	return (
		<nav className="fixed left-0 right-0 top-0 z-50 flex flex-shrink-0 items-center border-b border-border-subtle-neutral bg-background-lowest pt-safe-top">
			<div className="container flex h-16 items-center">
				<div className="flex-1" />
				<div className="flex flex-1 items-center justify-center">
					<Button intent="unstyled" className="-mx-1 p-1" asChild>
						<Link to="/">
							<img className="h-8 w-8" src={Logo} alt="wrkplay" />
							<span className="text-icon-highContrast-neutral font-bold tracking-tight">workplay</span>
						</Link>
					</Button>
				</div>

				<div className="flex flex-1 justify-end">{user && <UserAvatar user={user} size="sm" />}</div>
			</div>
		</nav>
	);
};
