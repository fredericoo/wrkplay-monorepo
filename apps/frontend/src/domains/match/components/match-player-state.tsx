import type { BadgeProps } from '@wrkplay/ui';
import { Badge } from '@wrkplay/ui';

import type { MatchPlayer } from '../match.types';

const stateToBadgeProps: Record<MatchPlayer['state'], BadgeProps> = {
	NOT_READY: {
		variant: 'outline',
		children: 'Not ready',
	},
	READY: {
		variant: 'positive',
		children: 'Ready',
	},
	VOTE_CANCEL: {
		variant: 'negative',
		children: 'Cancelling',
	},
	VOTE_DONE: {
		variant: 'positive',
		children: 'Done',
	},
	VOTE_FORFEIT: {
		variant: 'negative',
		children: 'Forfeiting',
	},
};

type MatchPlayerStateProps = { state: MatchPlayer['state'] };
export const MatchPlayerState = ({ state }: MatchPlayerStateProps) => (
	<Badge className="transition-all duration-500" {...stateToBadgeProps[state]} />
);
