import { textStylesPlugin } from './styles/styles.typography';
import { Config } from 'tailwindcss/types/config';
import { utilsPlugin } from './styles/styles.utils';

const config: Config = {
	content: ['../../packages/ui/src/components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		fontFamily: {
			body: ['Manrope Variable', 'sans-serif'],
			display: ['Manrope Variable', 'sans-serif'],
		},
		fontWeight: {
			medium: '500',
			semibold: '600',
		},
		letterSpacing: {
			tighter: '-0.03em',
			tight: '-0.01em',
			normal: '0',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.06em',
		},
		colors: {
			transparent: 'transparent',
			background: {
				lowest: 'hsl(var(--background) / <alpha-value>)',
				highest: 'hsl(var(--foreground) / <alpha-value>)',
				app: 'hsl(var(--mauve-1) / <alpha-value>)',
				subtle: {
					neutral: 'hsl(var(--mauve-2) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-2) / <alpha-value>)',
					primary: 'hsl(var(--purple-2) / <alpha-value>)',
					positive: 'hsl(var(--teal-2) / <alpha-value>)',
					warning: 'hsl(var(--amber-2) / <alpha-value>)',
					negative: 'hsl(var(--red-2) / <alpha-value>)',
				},
				strong: {
					neutral: 'hsl(var(--mauve-9) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-9) / <alpha-value>)',
					primary: 'hsl(var(--purple-9) / <alpha-value>)',
					positive: 'hsl(var(--teal-9) / <alpha-value>)',
					warning: 'hsl(var(--amber-9) / <alpha-value>)',
					negative: 'hsl(var(--red-9) / <alpha-value>)',
				},
			},
			interactive: {
				element: {
					neutral: 'hsl(var(--mauve-3) / <alpha-value>)',
					primary: 'hsl(var(--purple-3) / <alpha-value>)',
					positive: 'hsl(var(--teal-3) / <alpha-value>)',
					warning: 'hsl(var(--amber-3) / <alpha-value>)',
					negative: 'hsl(var(--red-3) / <alpha-value>)',
					hover: {
						neutral: 'hsl(var(--mauve-4) / <alpha-value>)',
						primary: 'hsl(var(--purple-4) / <alpha-value>)',
						positive: 'hsl(var(--teal-4) / <alpha-value>)',
						warning: 'hsl(var(--amber-4) / <alpha-value>)',
						negative: 'hsl(var(--red-4) / <alpha-value>)',
					},
					active: {
						neutral: 'hsl(var(--mauve-5) / <alpha-value>)',
						primary: 'hsl(var(--purple-5) / <alpha-value>)',
						positive: 'hsl(var(--teal-5) / <alpha-value>)',
						warning: 'hsl(var(--amber-5) / <alpha-value>)',
						negative: 'hsl(var(--red-5) / <alpha-value>)',
					},
				},
				solid: {
					neutral: 'hsl(var(--mauve-9) / <alpha-value>)',
					primary: 'hsl(var(--purple-9) / <alpha-value>)',
					positive: 'hsl(var(--teal-9) / <alpha-value>)',
					warning: 'hsl(var(--amber-9) / <alpha-value>)',
					negative: 'hsl(var(--red-9) / <alpha-value>)',
					hover: {
						neutral: 'hsl(var(--mauve-10) / <alpha-value>)',
						primary: 'hsl(var(--purple-10) / <alpha-value>)',
						positive: 'hsl(var(--teal-10) / <alpha-value>)',
						warning: 'hsl(var(--amber-10) / <alpha-value>)',
						negative: 'hsl(var(--red-10) / <alpha-value>)',
					},
					active: {
						neutral: 'hsl(var(--mauve-11) / <alpha-value>)',
						primary: 'hsl(var(--purple-11) / <alpha-value>)',
						positive: 'hsl(var(--teal-11) / <alpha-value>)',
						warning: 'hsl(var(--amber-11) / <alpha-value>)',
						negative: 'hsl(var(--red-11) / <alpha-value>)',
					},
				},
			},
			border: {
				subtle: {
					neutral: 'hsl(var(--mauve-6) / <alpha-value>)',
					primary: 'hsl(var(--purple-6) / <alpha-value>)',
					positive: 'hsl(var(--teal-6) / <alpha-value>)',
					warning: 'hsl(var(--amber-6) / <alpha-value>)',
					negative: 'hsl(var(--red-6) / <alpha-value>)',
				},
				element: {
					neutral: 'hsl(var(--mauve-7) / <alpha-value>)',
					primary: 'hsl(var(--purple-7) / <alpha-value>)',
					positive: 'hsl(var(--teal-7) / <alpha-value>)',
					warning: 'hsl(var(--amber-7) / <alpha-value>)',
					negative: 'hsl(var(--red-7) / <alpha-value>)',
					hover: {
						neutral: 'hsl(var(--mauve-8) / <alpha-value>)',
						primary: 'hsl(var(--purple-8) / <alpha-value>)',
						positive: 'hsl(var(--teal-8) / <alpha-value>)',
						warning: 'hsl(var(--amber-8) / <alpha-value>)',
						negative: 'hsl(var(--red-8) / <alpha-value>)',
					},
				},
				inverted: 'hsl(var(--background) / <alpha-value>)',
			},
			copy: {
				inverted: 'hsl(var(--background) / <alpha-value>)',
				lowcontrast: {
					neutral: 'hsl(var(--mauve-11) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-11) / <alpha-value>)',
					primary: 'hsl(var(--purple-11) / <alpha-value>)',
					positive: 'hsl(var(--teal-11) / <alpha-value>)',
					warning: 'hsl(var(--amber-11) / <alpha-value>)',
					negative: 'hsl(var(--red-11) / <alpha-value>)',
				},
				highcontrast: {
					neutral: 'hsl(var(--mauve-12) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-12) / <alpha-value>)',
					primary: 'hsl(var(--purple-12) / <alpha-value>)',
					positive: 'hsl(var(--teal-12) / <alpha-value>)',
					warning: 'hsl(var(--amber-12) / <alpha-value>)',
					negative: 'hsl(var(--red-12) / <alpha-value>)',
				},
			},
			icon: {
				inverted: 'hsl(var(--background) / <alpha-value>)',
				lowContrast: {
					neutral: 'hsl(var(--mauve-10) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-10) / <alpha-value>)',
					primary: 'hsl(var(--purple-10) / <alpha-value>)',
					positive: 'hsl(var(--teal-10) / <alpha-value>)',
					warning: 'hsl(var(--amber-10) / <alpha-value>)',
					negative: 'hsl(var(--red-10) / <alpha-value>)',
				},
				highContrast: {
					neutral: 'hsl(var(--mauve-12) / <alpha-value>)',
					neutralA: 'hsl(var(--alpha-12) / <alpha-value>)',
					primary: 'hsl(var(--purple-12) / <alpha-value>)',
					positive: 'hsl(var(--teal-12) / <alpha-value>)',
					warning: 'hsl(var(--amber-12) / <alpha-value>)',
					negative: 'hsl(var(--red-12) / <alpha-value>)',
				},
			},
		},
		borderRadius: {
			lg: '1rem',
			md: '0.75rem',
			sm: '0.5rem',
			full: '9999px',
		},
		extend: {
			padding: {
				'safe-top': 'var(--safe-area-inset-top)',
				'safe-bottom': 'var(--safe-area-inset-bottom)',
				'safe-left': 'var(--safe-area-inset-left)',
				'safe-right': 'var(--safe-area-inset-right)',
			},
			scale: {
				hover: '1.025',
				active: '0.975',
			},
			transitionTimingFunction: {
				'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},

	plugins: [textStylesPlugin, utilsPlugin],
};

export default config;
