import * as T from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import { TabsContext } from '../context';
import { TabsListVariants } from '../tabs.style';

type TabsContainerStateProps =
	| {
			/**
			 * The id of the tab that should be selected by default.
			 */
			defaultTabId: string | undefined;
			activeTabId?: never;
			onActiveTabIdChange?: never;
	  }
	| {
			activeTabId: string;
			onActiveTabIdChange?: (tabId: string) => void;
			defaultTabId?: never;
	  };

type CustomTabsProps = {
	children?: React.ReactNode;
} & TabsContainerStateProps &
	TabsListVariants;

export type TabsContainerProps = CustomTabsProps;

export const Container: React.FC<TabsContainerProps> = ({
	defaultTabId,
	children,
	activeTabId: controlledTabId,
	onActiveTabIdChange,
	...tabsVariants
}) => {
	const [activeTabId, setActiveTabId] = useState(defaultTabId);

	return (
		<TabsContext.Provider
			value={{
				variants: tabsVariants,
				activeTabId: controlledTabId || activeTabId,
			}}
		>
			<T.Root
				value={controlledTabId || activeTabId}
				onValueChange={tabId => {
					setActiveTabId(tabId);
					onActiveTabIdChange?.(tabId);
				}}
			>
				{children}
			</T.Root>
		</TabsContext.Provider>
	);
};
