import type { MatchPlayer } from '../match.types';
import { MatchPlayerState } from './match-player-state';

type MatchPlayerRowProps = { player: MatchPlayer; omitStates?: MatchPlayer['state'][] };

export const MatchPlayerRow = ({ player, omitStates = [] }: MatchPlayerRowProps) => {
	return (
		<p key={player.user.id} className="flex max-w-full items-center gap-4">
			<div className="w-24">
				{!omitStates.includes(player.state) && <MatchPlayerState className="block" state={player.state} />}
			</div>
			<span className="flex-grow truncate label-md">{player.user.name}</span>
		</p>
	);
};
