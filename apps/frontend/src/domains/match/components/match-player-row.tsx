import type { MatchPlayer } from '../match.types';
import { MatchPlayerState } from './match-player-state';

type MatchPlayerRowProps = { player: MatchPlayer; omitStates?: MatchPlayer['state'][] };

export const MatchPlayerRow = ({ player, omitStates = [] }: MatchPlayerRowProps) => {
	return (
		<p key={player.user.id}>
			{player.user.name} {!omitStates.includes(player.state) && <MatchPlayerState state={player.state} />}
		</p>
	);
};
