import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export const buttonVariants = cva(
	'inline-flex select-none items-center justify-center gap-2 truncate rounded-full ring-offset-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-solid-hover-primary/50 disabled:cursor-not-allowed disabled:opacity-25',
	{
		variants: {
			size: {
				unsized: '',
				icon: 'h-8 w-8 text-[24px]',
				md: 'px-6 py-2 label-md',
			},

			intent: {
				primary: `bg-interactive-solid-primary text-copy-inverted 
				 duration-300 ease-expo-out hover:-translate-y-0.5
				hover:shadow-lg hover:shadow-interactive-solid-hover-primary/30 active:translate-y-0 active:bg-interactive-solid-active-primary active:text-copy-inverted/90 active:shadow-none`,
				positive: `bg-interactive-solid-positive text-copy-highcontrast-positive duration-300 ease-expo-out hover:scale-hover
			   hover:bg-interactive-solid-hover-positive active:scale-active active:bg-interactive-solid-active-positive`,
				negative: `bg-interactive-solid-negative text-copy-inverted 
				duration-300 ease-expo-out hover:scale-hover
			   hover:bg-interactive-solid-hover-negative active:scale-active active:bg-interactive-solid-active-negative active:text-copy-inverted/90`,
				secondary: `bg-interactive-element-neutral text-copy-highcontrast-neutral hover:scale-hover
				hover:bg-interactive-element-hover-neutral active:scale-active active:bg-interactive-element-active-neutral`,
				ghost:
					'text-copy-lowcontrast-neutral hover:bg-interactive-element-hover-neutral hover:text-copy-highcontrast-neutral active:scale-active active:bg-interactive-element-active-neutral',
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
