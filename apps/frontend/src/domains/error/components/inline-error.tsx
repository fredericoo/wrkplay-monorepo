import { cn } from '@wrkplay/ui/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';
import { IoAlertCircle } from 'react-icons/io5';

type InlineErrorProps = {
	/** Index to stagger the animation in case there are multiple errors. */
	staggerIndex?: number;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.div>;

export const InlineError = ({ staggerIndex = 0, children, className, ...props }: InlineErrorProps) => {
	return (
		<motion.div
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			className={cn('flex max-w-full items-start gap-1 overflow-hidden text-copy-lowcontrast-negative', className)}
			{...props}
		>
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: staggerIndex * 0.05, opacity: { duration: 0.1 } }}
			>
				<IoAlertCircle className="mt-0.5 h-4 w-4" />
			</motion.div>

			<span className="label-sm" role="alert">
				{children}
			</span>
		</motion.div>
	);
};
