import type { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';

import type { SafeAreaVar } from '~/domains/common/common.constants';
import type { rootLoader } from '~/domains/common/routes/_root.loader';
import { usePlatform } from '~/domains/native/native.hooks';

export type MainCSSVars = Record<SafeAreaVar, string> & CSSProperties;

export const RootLayout = () => {
	const { safeArea } = useLoaderData<typeof rootLoader>();
	const platform = usePlatform();

	const cssSafeAreaVars: MainCSSVars = {
		'--safe-area-inset-top': `${safeArea.insets.top}px`,
		'--safe-area-inset-right': `${safeArea.insets.right}px`,
		'--safe-area-inset-bottom': `${safeArea.insets.bottom}px`,
		'--safe-area-inset-left': `${safeArea.insets.left}px`,
	};

	return (
		<div data-platform={platform} className="flex h-full flex-grow flex-col" style={cssSafeAreaVars}>
			<Outlet />
		</div>
	);
};
