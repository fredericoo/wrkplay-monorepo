import * as D from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import {
	animate,
	AnimatePresence,
	AnimationControls,
	DragControls,
	DragHandlers,
	frame,
	motion,
	MotionValue,
	ResolvedValues,
	transform,
	useAnimation,
	useDragControls,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion';
import { ComponentPropsWithoutRef, default as React, useEffect, useMemo, useRef } from 'react';
import { usePreviousValue, useQuerySelector } from '../../../hooks';

import { DialogHeader, DialogOverlay, dialogTransition, DialogTrigger } from '../common';
import { DialogProps } from '../common/types';
import { useDragThreshold } from './useDragThreshold';
import { cn } from '../../../../lib/utils';
import { cva } from 'class-variance-authority';

const OVERLAY_BG = { r: 19, g: 21, b: 32, a: 0.5 };
const PAGE_BG = { r: 255, g: 255, b: 255, a: 1 };

export const calcOverlayColor = (opacity: number) => {
	const c1 = OVERLAY_BG;
	const c2 = PAGE_BG;
	const o = opacity / 2;
	return {
		r: c1.r * o + c2.r * c2.a * (1 - o),
		g: c1.g * o + c2.g * c2.a * (1 - o),
		b: c1.b * o + c2.b * c2.a * (1 - o),
	};
};

const ActionSheetInternalContext = React.createContext<{
	isOpen?: boolean;
	dragControls?: DragControls;
	controls?: AnimationControls;
	onOpenChange?: (isOpen: boolean) => void;
}>({});
const useActionSheetContext = () => React.useContext(ActionSheetInternalContext);

export type ActionSheetRootProps = DialogProps;

export const Root: React.FC<ActionSheetRootProps> = ({ isOpen, onOpenChange, children }) => {
	const prevIsOpen = usePreviousValue(isOpen);
	const dragControls = useDragControls();
	const controls = useAnimation();

	useEffect(() => {
		if (prevIsOpen && !isOpen) {
			controls.start('hidden');
		} else if (!prevIsOpen && isOpen) {
			controls.start('visible');
		}
	}, [controls, isOpen, prevIsOpen]);

	return (
		<D.Root open={isOpen} onOpenChange={onOpenChange}>
			<ActionSheetInternalContext.Provider value={{ isOpen, dragControls, controls, onOpenChange }}>
				{children}
			</ActionSheetInternalContext.Provider>
		</D.Root>
	);
};

export const Header = DialogHeader;

const ActionSheetContentInternalContext = React.createContext<{ progress?: MotionValue<number> }>({});
const useActionSheetContentContext = () => React.useContext(ActionSheetContentInternalContext);

const wrapperVariant = cva('inset-0 z-50 flex items-end justify-center', {
	variants: {
		hasCustomContainer: {
			true: 'absolute',
			false: 'fixed',
		},
	},
	defaultVariants: {
		hasCustomContainer: false,
	},
});

import { circOut } from 'framer-motion/dom';

const transformBorderRadius = transform([0, 0.8], ['0px', '32px'], { ease: circOut });
const transformScale = transform([0, 0.8], [1, 0.9], { ease: circOut });
const transformTranslateY = transform([0, 0.8], ['translateY(0%)', 'translateY(5%)'], { ease: circOut });

export type ActionSheetContentProps = {
	children?: React.ReactNode;
	/** Where to render the dialog content. Defaults to document.body */
	container?: HTMLElement | null;
} & ComponentPropsWithoutRef<typeof motion.div>;

export const Content: React.FC<ActionSheetContentProps> = ({ container, children, className, ...props }) => {
	const { isOpen, dragControls, controls, onOpenChange } = useActionSheetContext();
	const panelRef = useRef<HTMLDivElement>(null);
	const hasCustomContainer = typeof container !== 'undefined';
	const dragThresholdProps = useDragThreshold(e => {
		e.preventDefault();
		dragControls?.start(e);
	}, 10);
	const opacity = useMotionValue(0);
	const themeTag = useQuerySelector('meta[name=theme-color]', []);
	const drawerWrapper = useQuerySelector('[drawer-wrapper]', []);

	useMotionValueEvent(opacity, 'change', v => {
		const updateThemeTag = () => {
			if (!themeTag) return;
			const colorObj = calcOverlayColor(v);
			const color = `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
			themeTag?.setAttribute('content', color);
		};
		const updateWraperSize = () => {
			if (!drawerWrapper) return;

			drawerWrapper.style.borderRadius = transformBorderRadius(v);
			drawerWrapper.style.scale = transformScale(v).toString();
			drawerWrapper.style.transform = transformTranslateY(v);
			if (v === 0) {
				drawerWrapper.style.removeProperty('overflow');
				document.body.style.removeProperty('background-color');
			} else {
				drawerWrapper.style.overflow = 'hidden';
				document.body.style.backgroundColor = 'black';
			}
		};
		frame.update(() => {
			updateThemeTag();
			updateWraperSize();
		});
	});

	const handleDragEnd: DragHandlers['onDragEnd'] = (_, info) => {
		const shouldClose = info.velocity.y > 40 || (info.velocity.y >= 0 && info.offset.y > 200);
		if (shouldClose) {
			controls?.start('hidden');
			onOpenChange?.(false);
		} else {
			controls?.start('visible');
		}
	};

	const handleUpdate = React.useCallback(
		(latest: ResolvedValues) => {
			if (typeof latest.y === 'string') return;
			const panelRect = panelRef.current?.getBoundingClientRect() || { height: 0 };
			const progress = transform(latest?.y || 0, [0, panelRect.height], [1, 0]);
			opacity.set(progress);
		},
		[opacity],
	);

	return (
		<D.Portal container={container} forceMount>
			{/* We need a real element for forwardingRef here — AnimatePresence impedes us from it. */}
			<span className={cn('relative z-10')}>
				<AnimatePresence>
					{isOpen && (
						<div className={wrapperVariant({ hasCustomContainer })}>
							<DialogOverlay opacity={opacity} />
							<D.Content asChild onOpenAutoFocus={e => e.preventDefault()}>
								<motion.div
									{...dragThresholdProps}
									ref={panelRef}
									className={cn(
										'relative z-50 mb-[-5%] flex w-full touch-none flex-col rounded-t-8 bg-background-lowest pb-[5%] shadow-surface-lg focus:outline-none',
										className,
									)}
									transition={dialogTransition}
									initial="hidden"
									animate={controls}
									variants={{
										visible: { y: 0 },
										hidden: { y: '120%' },
									}}
									onDragEnd={handleDragEnd}
									onUpdate={handleUpdate}
									dragElastic={0.05}
									dragConstraints={{ top: 0 }}
									drag="y"
									dragControls={dragControls}
									dragListener={false}
									{...props}
								>
									<ActionSheetContentInternalContext.Provider value={{ progress: opacity }}>
										{children}
									</ActionSheetContentInternalContext.Provider>
								</motion.div>
							</D.Content>
						</div>
					)}
				</AnimatePresence>
			</span>
		</D.Portal>
	);
};

export type ActionSheetCloseProps = Omit<ComponentPropsWithoutRef<'button'>, 'onPointerDown'>;

/** A visual handle for closing the sheet. Does not affect the actual closing. */
export const Close: React.FC<ActionSheetCloseProps> = ({ children, className, ...props }) => {
	const { progress } = useActionSheetContentContext();
	const fallbackMotionValue = useMotionValue(0);
	const point = useTransform(
		progress || fallbackMotionValue,
		[0.7, 1],
		[`M3 8.5L50.5 12.5L98 8.5`, `M3 8.5L50.5 8.5L98 8.5`],
		{
			clamp: true,
		},
	);

	return (
		<button
			aria-label="Drag down to close dialog"
			className={cn(
				'absolute inset-0 z-50 flex cursor-grab items-start justify-center border-0 text-icon-lowcontrast-neutral active:cursor-grabbing',
				className,
			)}
			{...props}
		>
			{children || (
				<svg width="101" height="22" viewBox="0 0 101 22" fill="none">
					<motion.path d={point} stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			)}
		</button>
	);
};

export type ActionSheetBodyProps = {
	children?: React.ReactNode;
	className?: never;
	style?: never;
} & ComponentPropsWithoutRef<'div'>;

export const Body: React.FC<ActionSheetBodyProps> = ({ children, className, ...props }) => {
	return (
		<div className={cn('flex-1 overflow-auto pb-safe-bottom hide-scrollbars', className)} {...props}>
			{children}
		</div>
	);
};

export const Trigger = DialogTrigger;

type ActionSheetScrollAreaProps = {
	children?: React.ReactElement;
};
/** A wrapper that does not render anything to the DOM, but handles events
 * by forwarding them down to the child. */
export const ScrollArea: React.FC<ActionSheetScrollAreaProps> = ({ children }) => {
	const handlePreventDrag: React.PointerEventHandler<HTMLElement> = e => {
		e.stopPropagation();
	};
	return <Slot onScroll={handlePreventDrag}>{children}</Slot>;
};
ScrollArea.displayName = 'Sheet.ScrollArea';
