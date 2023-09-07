import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { theme } from '../../../styles';
import { atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';
import { paragraph } from '../../../styles/typography.css';
import { hideScrollbars, resetButtonAppearance, truncateText } from '../../../styles/utils.css';
import { cva } from 'class-variance-authority';

const content = cva(
	'touch-action-none pb-5% mb-5% relative z-50 flex w-[min(100%,600px)] flex-col rounded-8 bg-background-lowest shadow-lg focus:outline-none',
);

export const content = style([
	atomicTwo({ display: 'flex', flexDirection: 'column' }).className,
	atomic({
		position: 'relative',
		backgroundColor: 'neutral.0',
		zIndex: 'modal',
	}),
	{
		touchAction: 'none',
		borderStartStartRadius: theme.radii.lg,
		borderStartEndRadius: theme.radii.lg,
		maxHeight: 'calc(100% - 32px)',
		width: 'min(100%, 600px)',
		boxShadow: theme.shadows.lg,
		// makes sure you can't see the end of the modal when dragging up
		paddingBottom: '5%',
		marginBottom: '-5%',
		':focus': {
			outline: 'none',
		},
	},
]);

export const body = style([hideScrollbars, { paddingBlockEnd: `env(safe-area-inset-bottom)` }]);

const className =
	'flex absolute inset-0 items-start justify-center z-50 text-icon-lowcontrast-neutral cursor-grab active:cursor-grabbing';
export const dragHandle = style([
	{ border: 'none' },
	atomicTwo({ display: 'flex', inset: '0', alignItems: 'flex-start', justifyContent: 'center' }).className,
	atomic({
		position: 'absolute',
		color: 'neutral.400',
		zIndex: 'modal',
	}),
	{
		':hover': {
			cursor: 'grab',
		},
		':active': {
			cursor: 'grabbing',
		},
	},
]);

const itemIconColor = createVar();
export const itemVariant = recipe({
	base: [
		resetButtonAppearance,
		atomicTwo({ display: 'flex', alignItems: 'center', width: '$full', gap: '$5' }).className,
		atomic({ paddingBlock: 3, paddingInline: 6 }),
		{
			WebkitTouchCallout: 'none',
			transition: `all ${theme.durations.normal} ${theme.easing.expo}`,
			transitionProperty: 'background-color',
			vars: {
				[itemIconColor]: theme.colors.neutral[400],
			},
			':focus': {
				outline: 'none',
			},
			':focus-visible': {
				backgroundColor: theme.colors.neutral[25],
			},
			':active': {
				backgroundColor: theme.colors.neutral[50],
			},
		},
	],
	variants: {
		colorScheme: {
			primary: {
				':active': {
					vars: {
						[itemIconColor]: theme.colors.primary.base,
					},
				},
			},
			error: {
				':active': {
					vars: {
						[itemIconColor]: theme.colors.error.base,
					},
				},
			},
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
	},
});

export const itemLabel = style([paragraph.md, truncateText, atomic({ color: 'neutral.900' })]);

export const itemIcon = style([
	{
		color: itemIconColor,
		transition: `all ${theme.durations.normal} ${theme.easing.expo}`,
		transitionProperty: 'color',
	},
]);
