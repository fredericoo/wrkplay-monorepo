import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export const buttonVariants = cva(
	'inline-block truncate rounded-full ring-offset-2 transition-all label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-solid-hover-primary/50',
	{
		variants: {
			size: {
				unsized: '',
				icon: 'h-8 w-8',
				md: 'px-6 py-2',
			},

			intent: {
				primary: `bg-interactive-solid-primary text-copy-inverted 
				 duration-300 ease-expo-out hover:scale-hover
				hover:bg-interactive-solid-hover-primary active:scale-active active:bg-interactive-solid-active-primary active:text-copy-inverted/90`,
				secondary: `focus-visible:ring-interactive-element-focus-primary bg-interactive-element-primary
				text-copy-highcontrast-primary hover:bg-interactive-element-hover-primary 
				focus-visible:ring-2 active:bg-interactive-element-active-primary`,
				ghost:
					'hover:bg-interactive-element-hover-neutral active:scale-active active:bg-interactive-element-active-neutral',
				unstyled: '',
			},
		},
		defaultVariants: {
			size: 'md',
			intent: 'primary',
		},
	},
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonVariants & {
	asChild?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
	({ children, asChild, size, intent, className, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp ref={ref} className={cn(buttonVariants({ size, intent }), className, 'button')} {...props}>
				{children}
			</Comp>
		);
	},
);
