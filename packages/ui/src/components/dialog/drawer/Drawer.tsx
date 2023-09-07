import * as D from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import { atomic } from '../../../styles';
import { AtomicPropsTwo, atomicTwo } from '../../../styles/atomicTwo.css';
import { themeClass } from '../../../styles/theme.css';
import { ButtonProps } from '../../button';
import { DialogHeader, DialogHeaderProps, DialogOverlay, dialogTransition } from '../common';
import { DialogCloseButton } from '../common/DialogCloseButton';
import { DialogTrigger, DialogTriggerProps } from '../common/DialogTrigger';
import { DialogProps as CommonDialogProps } from '../common/types';
import * as style from './Drawer.css';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

const drawerDialogAnimationVariants: Record<DrawerPosition, Variants> = {
	bottom: {
		initial: { y: '100%' },
		animate: { y: 0, transition: dialogTransition },
		exit: { y: '120%', transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
	},
	left: {
		initial: { x: '-100%' },
		animate: { x: 0, transition: dialogTransition },
		exit: { x: '-120%', transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
	},
	right: {
		initial: { x: '100%' },
		animate: { x: 0, transition: dialogTransition },
		exit: { x: '120%', transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
	},
	top: {
		initial: { y: '-100%' },
		animate: { y: 0, transition: dialogTransition },
		exit: { y: '-120%', transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
	},
};

const DrawerDialogInternalContext = React.createContext<{ isOpen?: boolean }>({ isOpen: false });
const useDialogDrawerContext = () => React.useContext(DrawerDialogInternalContext);

export type DrawerRootProps = CommonDialogProps;
export const Root: React.FC<DrawerRootProps> = ({ children, isOpen, ...props }) => {
	return (
		<D.Root open={isOpen} {...props}>
			<DrawerDialogInternalContext.Provider value={{ isOpen }}>{children}</DrawerDialogInternalContext.Provider>
		</D.Root>
	);
};

export type DrawerContentProps = {
	children?: React.ReactNode;
	/** Where to render the dialog content. Defaults to document.body */
	container?: HTMLElement | null;
	position: DrawerPosition;
	/** Whether to close the dialog when clicking outside of it. Defaults to true. */
	closeOnOutsideClick?: boolean;
	className?: never;
} & AtomicPropsTwo;

export const Content: React.FC<DrawerContentProps> = ({
	children,
	container,
	position,
	className: nativeClassName,
	closeOnOutsideClick = true,
	...props
}) => {
	const { className: atomicClassName, otherProps, style: atomicStyle } = atomicTwo(props);
	const { isOpen } = useDialogDrawerContext();
	const hasCustomContainer = typeof container !== 'undefined';

	return (
		<D.Portal container={container} forceMount>
			{/* We need a real element for forwardingRef here — AnimatePresence impedes us from it. */}
			<span className={clsx(themeClass, atomic({ zIndex: 'docked' }))}>
				<AnimatePresence>
					{isOpen && (
						<div className={style.wrapperVariant({ hasCustomContainer, position })}>
							<DialogOverlay />
							<D.Content
								asChild
								onInteractOutside={closeOnOutsideClick ? undefined : e => e.preventDefault()}
								onPointerDownOutside={closeOnOutsideClick ? undefined : e => e.preventDefault()}
							>
								<motion.div
									initial="initial"
									animate="animate"
									exit="exit"
									variants={drawerDialogAnimationVariants[position]}
									className={clsx(style.contentVariant({ position }), atomicClassName, nativeClassName)}
									style={atomicStyle}
									{...otherProps}
								>
									{children}
								</motion.div>
							</D.Content>
						</div>
					)}
				</AnimatePresence>
			</span>
		</D.Portal>
	);
};

export type DrawerHeaderProps = DialogHeaderProps;
export const Header = DialogHeader;

export type DrawerCloseProps = ButtonProps;
export const Close = DialogCloseButton;

export type DrawerTriggerProps = DialogTriggerProps;
export const Trigger = DialogTrigger;

export type DrawerBodyProps = { children?: React.ReactNode };
export const Body: React.FC<DrawerBodyProps> = ({ children }) => {
	return <div className={style.body}>{children}</div>;
};
