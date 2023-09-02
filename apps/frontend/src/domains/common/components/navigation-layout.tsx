import { Button, Tabbar } from '@wrkplay/ui';
import { IoFlame, IoFlameOutline, IoPersonCircle, IoPersonCircleOutline } from 'react-icons/io5';
import { Link, Outlet, useRouteLoaderData } from 'react-router-dom';

import { useOptimisticLocation } from '~/domains/routing/routing.hooks';
import type { rootLoader } from '~/routes/__root/__root.loader';

import { Navbar } from './navbar';

export const NavigationLayout = () => {
	const { user } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
	const { pathname } = useOptimisticLocation();

	return (
		<>
			<Navbar user={user} />
			<Tabbar.Container className="flex-shrink-0">
				<Link className="flex flex-1" to="/">
					<Tabbar.Item isActive={pathname === '/'} icon={{ active: <IoFlame />, inactive: <IoFlameOutline /> }}>
						Matches
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

				<Link className="flex flex-1" to="/users">
					<Tabbar.Item
						isActive={pathname.includes('/users')}
						icon={{ active: <IoPersonCircle />, inactive: <IoPersonCircleOutline /> }}
					>
						Users
					</Tabbar.Item>
				</Link>
			</Tabbar.Container>
			<main className="flex flex-grow flex-col pb-24 pt-16">
				<Outlet />
			</main>
		</>
	);
};
