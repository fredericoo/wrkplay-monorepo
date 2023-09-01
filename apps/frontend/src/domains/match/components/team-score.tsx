import { AnimatedText, Button } from '@wrkplay/ui';
import { cn } from '@wrkplay/ui/lib/utils';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import type { FormProps } from 'react-router-dom';
import { Form } from 'react-router-dom';

import type { MatchPlayer } from '../match.types';

type TeamScoreProps = {
	side: MatchPlayer['side'];
	score: number;
	controls?: boolean;
} & FormProps;

export const TeamScore = ({ side, score, controls, className, ...props }: TeamScoreProps) => {
	return (
		<Form method="POST" className={cn('flex items-center gap-4', className)} {...props}>
			<input type="hidden" name="intent" value="update_score" />
			<input type="hidden" name="side" value={side} />

			{controls && (
				<Button type="submit" intent="negative" name="score" value={score - 1} size="icon" disabled={score < 1}>
					<IoArrowDown />
				</Button>
			)}

			<p className="flex-grow tabular-nums display-sm">
				<AnimatedText animateInitial={false}>{score.toString()}</AnimatedText>
			</p>

			{controls && (
				<Button type="submit" intent="positive" name="score" value={score + 1} size="icon">
					<IoArrowUp />
				</Button>
			)}
		</Form>
	);
};
