import { Button } from '@wrkplay/ui';
import { Link } from 'react-router-dom';

import { UserAvatar } from '~/domains/user/components';

import Logo from '../../../assets/logo.png';

type NavbarProps = {
	user: { name: string } | null;
};

export const Navbar = ({ user }: NavbarProps) => {
	return (
		<nav className="flex flex-shrink-0 items-center border-b border-border-subtle-neutral bg-background-lowest pt-safe-top">
			<div className="container flex items-center py-2">
				<div className="flex-1" />
				<div className="flex flex-1 items-center justify-center">
					<Button intent="unstyled" className="-mx-1 p-1" asChild>
						<Link to="/">
							<img className="h-8 w-8" src={Logo} alt="wrkplay" />
							<span className="font-bold tracking-tight text-icon-highContrast-neutral">workplay</span>
						</Link>
					</Button>
				</div>

				<div className="flex flex-1 justify-end">{user && <UserAvatar user={user} size="sm" />}</div>
			</div>
		</nav>
	);
};
