import plugin from 'tailwindcss/plugin';

const SCALE_MULTIPLIER = 0.25;
const SCALE_UNIT = 'rem';

export const scale = (index: number) => ({
	value: index * SCALE_MULTIPLIER + SCALE_UNIT,
});

export const pxToRem = (px: number) => `${px / 16}rem`;

export const utilsPlugin = plugin(({ addUtilities }) => {
	addUtilities({
		'.touch-callout-none': {
			WebkitTouchCallout: 'none',
		},
		'.hide-scrollbars': {
			'&::-webkit-scrollbar': {
				display: 'none',
			},
			scrollbarWidth: 'none',
			'-ms-overflow-style': 'none',
		},
		'.touch-hitbox': {
			'&::before': {
				content: "''",
				position: 'absolute',
				display: 'block',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '100%',
				height: '100%',
				minHeight: '44px',
				minWidth: '44px',
			},
		},
	});
});
