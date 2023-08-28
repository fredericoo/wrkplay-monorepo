import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/utils';

const inputVariants = cva('flex rounded-2 transition-all duration-300 ease-expo-out body-sm', {
	variants: {
		variant: {
			default:
				'border border-border-element-neutral bg-background-lowest caret-interactive-solid-primary ring-offset-2 file:border-0 file:bg-transparent file:body-sm placeholder:text-copy-lowcontrast-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-solid-hover-primary/50 disabled:cursor-not-allowed',
		},
		size: {
			unsized: '',
			md: 'px-3 py-2',
		},
	},
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
});

type InputVariants = VariantProps<typeof inputVariants>;

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputVariants> & InputVariants;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, size, ...props }, ref) => {
	return <input type={type} className={cn(inputVariants({ size }), className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
