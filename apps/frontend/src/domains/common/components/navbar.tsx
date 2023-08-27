import { Button, Logo } from '@wrkplay/ui';
import { Link } from 'react-router-dom';

type NavbarProps = {
	user: { name: string } | null;
};

export const Navbar = ({ user }: NavbarProps) => {
	return (
		<nav className="border-b border-border-subtle-neutral bg-background-lowest py-4">
			<div className="container flex items-center">
				<div className="flex flex-1 items-center justify-start gap-4">
					<Button intent="unstyled" className="-mx-1 p-1" asChild>
						<Link to="/">
							<Logo height="24px" />
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

				<div className="flex flex-1 justify-end">{user?.name}</div>
			</div>
		</nav>
	);
};
