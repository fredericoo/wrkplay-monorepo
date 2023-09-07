import { style } from '@vanilla-extract/css';
import { atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';

export const wrapper = style([
	atomicTwo({ width: '$full' }).className,
	atomic({
		position: 'relative',
	}),
]);
