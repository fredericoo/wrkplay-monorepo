import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '../../../../lib/utils';

export type DialogHeaderProps = ComponentPropsWithoutRef<'header'>;

/** Content of your Dialog. Composed from Stack. */
export const DialogHeader = forwardRef<HTMLElement, DialogHeaderProps>(({ children, className, ...props }, ref) => {
	return (
		<header
			className={cn('relative flex items-center gap-4 border-b border-border-subtle-neutral', className)}
			{...props}
		>
			{children}
		</header>
	);
});

DialogHeader.displayName = 'DialogHeader';
