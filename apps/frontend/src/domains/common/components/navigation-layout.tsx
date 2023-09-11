import { Button, Tabbar } from '@wrkplay/ui';
import {
	IoCog,
	IoCogOutline,
	IoFlame,
	IoHome,
	IoHomeOutline,
	IoMap,
	IoMapOutline,
	IoPerson,
	IoPersonOutline,
} from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '~/domains/auth/auth.hooks';
import { useOptimisticLocation } from '~/domains/routing/routing.hooks';

import { Navbar } from './navbar';

export const NavigationLayout = () => {
	const { user } = useAuth();
	const { pathname } = useOptimisticLocation();

	return (
		<>
			<Navbar user={user} />
			<div className="fixed bottom-0 z-50 flex w-full justify-center">
				<Tabbar.Container className="flex-shrink-0">
					<Link className="flex flex-1" to="/">
						<Tabbar.Item isActive={pathname === '/'} icon={{ active: <IoHome />, inactive: <IoHomeOutline /> }}>
							Feed
						</Tabbar.Item>
					</Link>

					<Link className="flex flex-1" to="/venues">
						<Tabbar.Item
							isActive={pathname.includes('/venues')}
							icon={{ active: <IoMap />, inactive: <IoMapOutline /> }}
						>
							Venues
						</Tabbar.Item>
					</Link>

					<div className="flex -translate-y-1/3 items-center">
						<Button size="unsized" asChild>
							<Link className="aspect-square flex-1 px-4 py-2" to="/join-match">
								<div className="flex flex-col items-center gap-0.5">
									<IoFlame className="label-lg" />
									<span className="label-xs">Join</span>
								</div>
							</Link>
						</Button>
					</div>

					<Link className="flex flex-1" to="/me">
						<Tabbar.Item
							isActive={pathname.includes('/me')}
							icon={{ active: <IoPerson />, inactive: <IoPersonOutline /> }}
						>
							Me
						</Tabbar.Item>
					</Link>

					<Link className="flex flex-1" to="/settings">
						<Tabbar.Item
							isActive={pathname.includes('/settings')}
							icon={{ active: <IoCog />, inactive: <IoCogOutline /> }}
						>
							Settings
						</Tabbar.Item>
					</Link>
				</Tabbar.Container>
			</div>
			<div className="flex flex-grow flex-col pb-safe-bottom pt-safe-top">
				<main className="flex flex-grow flex-col py-16">
					<Outlet />
				</main>
			</div>
		</>
	);
};
