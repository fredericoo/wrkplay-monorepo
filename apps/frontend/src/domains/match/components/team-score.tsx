import { Button } from '@wrkplay/ui';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import { Form } from 'react-router-dom';

import type { MatchPlayer } from '../match.types';

type TeamScoreProps = {
	side: MatchPlayer['side'];
	score: number;
	controls?: boolean;
};

export const TeamScore = ({ side, score, controls }: TeamScoreProps) => {
	return (
		<Form method="POST" className="flex items-center gap-4">
			<input type="hidden" name="intent" value="update_score" />
			<input type="hidden" name="side" value={side} />

			{controls && (
				<Button type="submit" intent="negative" name="score" value={score - 1} size="icon" disabled={score < 1}>
					<IoArrowDown />
				</Button>
			)}

			<p className="display-sm">{score}</p>

			{controls && (
				<Button type="submit" intent="positive" name="score" value={score + 1} size="icon">
					<IoArrowUp />
				</Button>
			)}
		</Form>
	);
};
