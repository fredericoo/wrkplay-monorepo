import * as T from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import React from 'react';
import { easing } from '../../../../lib/motion';
import { useTabsVariants } from '../context';
import { activeMarkerVariant, tabLabelVariant, tabVariant } from '../tabs.style';

type CustomTabProps = {
	tabId: string;
	isDisabled?: boolean;
} & Omit<T.TabsTriggerProps, 'value' | 'disabled'>;

export type TabsTabProps = CustomTabProps;

export const Tab: React.FC<CustomTabProps> = ({ tabId, children, isDisabled, ...props }) => {
	const {
		variants: { variant, tabsPlacement, size },
		activeTabId,
	} = useTabsVariants();
	const isActive = tabId === activeTabId;

	return (
		<T.Trigger
			value={tabId}
			className={tabVariant({
				variant,
				size,
				tabsPlacement,
			})}
			disabled={isDisabled}
			{...props}
		>
			<div className={tabLabelVariant({ isActive })}>{children}</div>
			{isActive && (
				<motion.div
					transition={easing.springFast}
					aria-hidden
					key="tab-active"
					layoutId="tab-active"
					className={activeMarkerVariant({ variant })}
				/>
			)}
		</T.Trigger>
	);
};
