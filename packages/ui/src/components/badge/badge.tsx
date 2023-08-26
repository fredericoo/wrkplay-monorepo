import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils';

const badgeStyles = cva('truncate rounded-full px-3 py-0.5 label-xs', {
	variants: {
		variant: {
			outline: 'bg-background-lowest text-copy-highcontrast-neutral ring-1 ring-border-subtle-neutral',
			primary: 'bg-interactive-solid-primary text-copy-inverted',
			positive: 'bg-interactive-solid-positive text-copy-highcontrast-positive',
			negative: 'bg-interactive-solid-negative text-copy-inverted',
			warning: 'bg-interactive-solid-warning text-copy-highcontrast-warning',
		},
	},
	defaultVariants: {
		variant: 'outline',
	},
});
type BadgeVariants = VariantProps<typeof badgeStyles>;

export type BadgeProps = {
	asChild?: boolean;
} & BadgeVariants &
	ComponentPropsWithoutRef<'span'>;

export const Badge = ({ asChild, variant, children, className, ...props }: BadgeProps) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp role="status" className={cn(badgeStyles({ variant }), className)} {...props}>
			{children}
		</Comp>
	);
};
