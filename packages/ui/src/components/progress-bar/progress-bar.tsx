import * as Progress from '@radix-ui/react-progress';
import clsx from 'clsx';
import type { RecipeVariantProps } from 'styled-system/css';
import { cva } from 'styled-system/css';

export const progressBarRootStyles = cva({
	base: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: '$12',
		transform: 'translateZ(0)',
	},

	variants: {
		size: {
			md: {
				height: 'ProgressBar',
				width: '1/2',
			},
		},
		intent: {
			default: {
				bg: 'Background.app.primary',
			},

			primary: {
				bg: 'Interactive.element.primary',
			},
		},
	},
	defaultVariants: {
		intent: 'default',
		size: 'md',
	},
});

export const progressBarIndicatorStyles = cva({
	base: {
		height: 'full',
		width: 'full',
		transition: 'colors',
	},

	variants: {
		intent: {
			default: {
				bg: 'neutral.dark.solid.500',
			},

			primary: {
				bg: 'Interactive.element.primary',
			},
		},
	},
	defaultVariants: {
		intent: 'default',
	},
});

type ProgressBarRootVariants = RecipeVariantProps<typeof progressBarRootStyles>;
type ProgressBarIndicatorVariants = RecipeVariantProps<typeof progressBarIndicatorStyles>;

type progressBarProps = ProgressBarRootVariants &
	ProgressBarIndicatorVariants & {
		progress: number;
	};

export const ProgressBar: React.FC<progressBarProps> = ({ progress, size, intent }) => {
	return (
		<Progress.Root className={clsx(progressBarRootStyles({ intent, size }))} value={progress}>
			<Progress.Indicator
				className={clsx(progressBarIndicatorStyles({ intent }))}
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</Progress.Root>
	);
};
