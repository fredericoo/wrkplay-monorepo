import { cn } from '@wrkplay/ui/lib/utils';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

import type { MatchPlayer } from '../match.types';
import { MatchPlayerRow } from './match-player-row';

type MatchJoinSideProps = {
	players?: MatchPlayer[];
	label: string;
	teamSize: number;
} & ComponentPropsWithoutRef<'div'>;

export const MatchJoinSide = ({ players, teamSize, label, className, ...props }: MatchJoinSideProps) => {
	const extraPlayersToRender = teamSize - (players?.length ?? 0);
	return (
		<div
			className={cn(
				'flex flex-col gap-4 rounded-5 bg-background-subtle-neutral p-2 ring-1 ring-border-element-neutral/30',
				className,
			)}
			{...props}
		>
			<h2 className="text-center heading-lg">{label}</h2>

			<LayoutGroup id={label}>
				<AnimatePresence mode="popLayout">
					<motion.ul
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
					>
						{players?.map(player => (
							<li key={player.user.id}>
								<MatchPlayerRow player={player} />
							</li>
						))}
						{extraPlayersToRender > 0 &&
							new Array(extraPlayersToRender).fill(null).map((_, i) => (
								<li key={i}>
									<MatchPlayerRow />
								</li>
							))}
					</motion.ul>
				</AnimatePresence>
			</LayoutGroup>
		</div>
	);
};
