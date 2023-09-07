import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';

export const wrapperVariant = recipe({
	base: [atomicTwo({ display: 'flex', gap: '$0', inset: '0' }).className, atomic({ zIndex: 'modal' })],
	variants: {
		hasCustomContainer: {
			true: atomic({
				position: 'absolute',
			}),
			false: atomic({
				position: 'fixed',
			}),
		},
		position: {
			left: atomicTwo({ justifyContent: 'flex-start' }).className,
			right: atomicTwo({ justifyContent: 'flex-end' }).className,
			top: atomicTwo({ alignItems: 'flex-start' }).className,
			bottom: atomicTwo({ alignItems: 'flex-end' }).className,
		},
	},
});

export const contentVariant = recipe({
	base: [
		atomicTwo({ width: '$full', height: '$full', display: 'flex', flexDirection: 'column' }).className,
		atomic({
			backgroundColor: 'neutral.0',
		}),
		{
			':focus': {
				outline: 'none',
			},
		},
	],
	variants: {
		position: {
			left: { maxWidth: '600px' },
			right: { maxWidth: '600px' },
			top: {},
			bottom: {},
		},
	},
});

export const body = style([
	{
		flex: 1,
		overflowY: 'auto',
	},
]);
