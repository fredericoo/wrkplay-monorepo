import type { MatchPlayer } from '../match.types';
import { MatchPlayerState } from './match-player-state';

type MatchPlayerRowProps = { player: MatchPlayer };

export const MatchPlayerRow = ({ player }: MatchPlayerRowProps) => {
	return (
		<p key={player.user.id}>
			{player.user.name} <MatchPlayerState state={player.state} />
		</p>
	);
};
