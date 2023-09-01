import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

type TabbarContainerProps = React.ComponentPropsWithoutRef<'nav'>;

const Container: React.FC<TabbarContainerProps> = ({ className, ...props }) => {
	return (
		<nav
			className={cn(
				'fixed bottom-0 left-0 right-0 z-50 flex w-full select-none bg-background-lowest pb-safe-bottom',
				className,
			)}
			{...props}
		/>
	);
};

const itemVariant = cva(
	'relative flex flex-1 select-none flex-col items-center gap-1 overflow-hidden py-3 transition-all duration-500 ease-expo-out touch-callout-none focus:ring-0 focus-visible:bg-background-subtle-primary active:bg-background-subtle-primary active:ring-0',
	{
		variants: {
			isActive: {
				true: 'text-icon-lowContrast-primary shadow-[0_-24px_20px_-24px_var(--tw-shadow-color)] shadow-icon-lowContrast-primary/30',
				false: 'text-copy-lowcontrast-neutral',
			},
		},
		defaultVariants: {
			isActive: false,
		},
	},
);

type TabbarItemProps = {
	isActive?: boolean;
	icon: { active: JSX.Element; inactive: JSX.Element };
} & React.ComponentPropsWithoutRef<'div'>;

const Item = forwardRef<HTMLDivElement, TabbarItemProps>(({ icon, children, isActive, className, ...props }, ref) => {
	const Icon = isActive ? icon.active : icon.inactive;

	return (
		<div draggable="false" ref={ref} className={itemVariant({ isActive, className })} {...props}>
			{Icon}
			<p className="w-full truncate text-center label-xs">{children}</p>
		</div>
	);
});

Item.displayName = 'TabbarItem';

export const Tabbar = {
	Container,
	Item,
};
