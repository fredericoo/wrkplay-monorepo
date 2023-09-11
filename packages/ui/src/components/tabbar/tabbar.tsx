import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

type TabbarContainerProps = React.ComponentPropsWithoutRef<'nav'>;

const Container: React.FC<TabbarContainerProps> = ({ className, ...props }) => {
	return (
		<nav
			className={cn(
				'flex w-full max-w-xl select-none rounded-t-8 bg-background-lowest pb-safe-bottom shadow-surface-lg-inverted',
				className,
			)}
			{...props}
		/>
	);
};

const itemVariant = cva(
	'relative flex flex-1 select-none flex-col items-center gap-1 overflow-hidden py-3 transition-all duration-500 ease-expo-out focus:outline-none focus-visible:bg-background-strong-primary',
	{
		variants: {
			isActive: {
				true: 'text-copy-highcontrast-neutral',
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
