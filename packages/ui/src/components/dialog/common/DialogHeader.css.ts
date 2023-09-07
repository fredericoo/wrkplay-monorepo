import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles';
import { atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';

export const header = style([
	atomicTwo({ display: 'flex', gap: '$4', alignItems: 'center' }).className,
	atomic({ position: 'relative' }),
	{
		borderBottom: '1px solid',
		borderBottomColor: theme.colors.neutral[100],
	},
]);
