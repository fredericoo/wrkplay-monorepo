import { Button } from '@wrkplay/ui';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/logo.png';

type NavbarProps = {
	user: { name: string } | null;
};

export const Navbar = ({ user }: NavbarProps) => {
	return (
		<nav className="flex h-16 items-center border-b border-border-subtle-neutral bg-background-lowest">
			<div className="container flex items-center">
				<div className="flex flex-1 items-center justify-start gap-4">
					<Button intent="unstyled" className="-mx-1 p-1" asChild>
						<Link to="/">
							<img className="h-8 w-8" src={Logo} alt="wrkplay" />
						</Link>
					</Button>
				</div>

				<ul className="flex items-center gap-2">
					<Button intent="ghost" asChild>
						<Link to={`/`}>Home</Link>
					</Button>
					<Button intent="ghost" asChild>
						<Link to={`/users`}>Users</Link>
					</Button>
				</ul>

				<div className="flex flex-1 justify-end">
					{user && (
						<div className="flex items-center gap-1 label-sm">
							<IoPersonCircleOutline className="label-lg" />
							<span>{user.name}</span>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
