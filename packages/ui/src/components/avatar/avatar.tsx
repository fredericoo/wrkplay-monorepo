import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/utils';

const avatarVariants = cva(
	'focus:ring-ring relative flex shrink-0 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
	{
		variants: {
			size: {
				md: 'h-10 w-10',
				sm: 'h-8 w-8',
				xs: 'h-6 w-6',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

type AvatarVariants = VariantProps<typeof avatarVariants>;

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarVariants;

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ className, size, ...props }, ref) => (
		<AvatarPrimitive.Root ref={ref} className={avatarVariants({ size, className })} {...props} />
	),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		draggable="false"
		ref={ref}
		className={cn('aspect-square h-full w-full', className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const avatarFallbackVariants = cva('flex h-full w-full select-none items-center justify-center rounded-full', {
	variants: {
		variant: {
			0: 'bg-interactive-element-neutral text-copy-lowcontrast-neutral',
			1: 'bg-interactive-element-positive text-copy-lowcontrast-positive',
			2: 'bg-interactive-element-negative text-copy-lowcontrast-negative',
			3: 'bg-interactive-element-warning text-copy-lowcontrast-warning',
			4: 'bg-interactive-element-primary text-copy-lowcontrast-primary',
		},
	},
	defaultVariants: {
		variant: 0,
	},
});

export type AvatarFallbackVariants = VariantProps<typeof avatarFallbackVariants>;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & AvatarFallbackVariants
>(({ className, variant, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		draggable="false"
		ref={ref}
		className={avatarFallbackVariants({ variant, className })}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
