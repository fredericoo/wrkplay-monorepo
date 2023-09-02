import type { BadgeProps } from '@wrkplay/ui';
import { Badge } from '@wrkplay/ui';
import { cn } from '@wrkplay/ui/lib/utils';

import type { MatchPlayer } from '../match.types';

const stateToBadgeProps: Record<MatchPlayer['state'], BadgeProps> = {
	NOT_READY: {
		colorScheme: 'outline',
		children: 'Not ready',
	},
	READY: {
		colorScheme: 'positive',
		variant: 'highContrast',
		children: 'Ready',
	},
	VOTE_CANCEL: {
		colorScheme: 'negative',
		children: 'Cancelling',
	},
	VOTE_DONE: {
		colorScheme: 'positive',
		children: 'Done',
	},
	VOTE_FORFEIT: {
		colorScheme: 'negative',
		children: 'Forfeiting',
	},
};

type MatchPlayerStateProps = { state: MatchPlayer['state'] } & BadgeProps;
export const MatchPlayerState = ({ state, className, ...props }: MatchPlayerStateProps) => (
	<Badge className={cn('transition-all duration-500', className)} {...stateToBadgeProps[state]} {...props} />
);
