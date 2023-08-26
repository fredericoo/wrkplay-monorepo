import { Slot } from '@radix-ui/react-slot';
import type { Variant } from 'framer-motion';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils';

export const motionVariants = {
	static: { initial: {}, animate: {}, exit: {} },
	slideUp: {
		initial: { y: '100%' },
		animate: { y: 0 },
		exit: { y: '-100%' },
	},
} satisfies Record<string, CharacterAnimationVariants>;

type AnimatedTextProps = {
	children?: string | number;
	variant?: keyof typeof motionVariants;
	stagger?: boolean;
	animateInitial?: boolean;
	asChild?: boolean;
} & ComponentPropsWithoutRef<'span'>;

type CharacterAnimationVariants = Record<'initial' | 'animate' | 'exit', Variant>;

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	children,
	stagger,
	animateInitial,
	variant = 'slideUp',
	className,
	asChild,
	...props
}) => {
	const Comp = asChild ? Slot : 'span';
	const characters = React.useMemo(() => {
		if (!children) return [];
		return children.toString().split('');
	}, [children]);
	const layoutId = React.useId();

	return (
		<Comp className={cn('block', className)} {...props}>
			<LayoutGroup id={layoutId}>
				<AnimatePresence mode="popLayout" initial={animateInitial}>
					{characters.map((character, i) => (
						<motion.span key={`${character}${i}`} className="relative inline-block overflow-hidden">
							<motion.span
								className="inline-block"
								initial="initial"
								animate="animate"
								exit="exit"
								transition={stagger ? { delay: i / 100 } : undefined}
								variants={motionVariants[variant]}
							>
								{character === ' ' ? '\u00A0' : character}
							</motion.span>
						</motion.span>
					))}
				</AnimatePresence>
			</LayoutGroup>
		</Comp>
	);
};
