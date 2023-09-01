import { Avatar, AvatarFallback } from '@wrkplay/ui';
import { cn } from '@wrkplay/ui/lib/utils';

import { UserAvatar } from '~/domains/user/components';

import type { MatchPlayer } from '../match.types';
import { MatchPlayerState } from './match-player-state';

type MatchPlayerRowProps = { player?: MatchPlayer; omitStates?: MatchPlayer['state'][] };

export const MatchPlayerRow = ({ player, omitStates = [] }: MatchPlayerRowProps) => {
	return (
		<div className="flex max-w-full items-center gap-4 border-t border-border-subtle-neutral py-2">
			<div className="w-24">
				{player && !omitStates.includes(player.state) && <MatchPlayerState className="block" state={player.state} />}
			</div>
			{player ? (
				<UserAvatar user={player.user} size="sm" />
			) : (
				<Avatar size="sm">
					<AvatarFallback variant={0} />
				</Avatar>
			)}
			<p className={cn('flex-grow truncate label-md', { 'opacity-25': !player })}>{player?.user.name ?? 'Open'}</p>
		</div>
	);
};
