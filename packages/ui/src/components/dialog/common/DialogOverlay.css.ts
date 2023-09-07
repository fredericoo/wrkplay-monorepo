import { style } from '@vanilla-extract/css';
import { atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';

export const overlay = style([
	{
		backgroundColor: `#1315207F`,
	},
	atomicTwo({ inset: '0' }).className,
	atomic({ position: 'absolute' }),
]);
