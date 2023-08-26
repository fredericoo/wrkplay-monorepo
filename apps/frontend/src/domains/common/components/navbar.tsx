import { Badge, Button, Logo } from '@wrkplay/ui';
import { Link } from 'react-router-dom';

import { Deferred } from './Deferred';

type NavbarProps = {
	venueId?: string;
	counts?: Promise<{ pitches: number }> | { pitches: number };
};

export const Navbar = ({ venueId, counts }: NavbarProps) => {
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

				<div className="flex items-center gap-2">
					{venueId && (
						<>
							<Button intent="ghost" asChild>
								<Link to={`/venue/${venueId}`}>Home</Link>
							</Button>
							<Button intent="ghost" asChild>
								<Link to={`/venue/${venueId}/pitches`}>
									Pitches{' '}
									<Deferred data={counts} loadingElement={null} errorElement={null}>
										{counts => {
											if (!counts) return null;
											return <Badge variant="outline">{counts.pitches}</Badge>;
										}}
									</Deferred>
								</Link>
							</Button>
							<Button intent="ghost" asChild>
								<Link to={`/settings`}>Settings</Link>
							</Button>
						</>
					)}
				</div>

				<div className="flex flex-1 justify-end"></div>
			</div>
		</nav>
	);
};
