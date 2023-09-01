import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils';

const badgeStyles = cva('truncate rounded-full px-3 py-0.5 text-center shadow-surface-sm body-sm', {
	variants: {
		variant: {
			outline: 'bg-background-lowest text-copy-lowcontrast-neutral ring-1 ring-border-element-neutral/30',
			primary: 'bg-background-subtle-primary text-copy-lowcontrast-primary ring-1 ring-border-element-primary/5',
			positive: 'bg-background-subtle-positive text-copy-lowcontrast-positive ring-1 ring-border-element-positive/30',
			negative: 'bg-background-subtle-negative text-copy-lowcontrast-negative ring-1 ring-border-element-negative/5',
			warning: 'bg-background-subtle-warning text-copy-lowcontrast-warning ring-1 ring-border-element-warning/5',
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
