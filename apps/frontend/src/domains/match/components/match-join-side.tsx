import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { match, P } from 'ts-pattern';

import type { MatchPlayer } from '../match.types';
import { MatchPlayerRow } from './match-player-row';

type MatchJoinSideProps = {
	players?: MatchPlayer[];
	label: string;
};

export const MatchJoinSide = ({ players, label }: MatchJoinSideProps) => (
	<div className="flex flex-col gap-4 rounded-5 border border-border-subtle-neutral bg-background-subtle-neutral p-2">
		<h2 className="text-center heading-lg">{label}</h2>

		<LayoutGroup id={label}>
			<AnimatePresence mode="popLayout">
				{match(players)
					.with(P.union(undefined, []), () => (
						<motion.p
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							key="no-players"
							className="text-center text-copy-lowcontrast-neutral body-sm"
						>
							No one has joined yet
						</motion.p>
					))
					.otherwise(players => (
						<motion.ul
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
						>
							{players.map(player => (
								<li key={player.user.id}>
									<MatchPlayerRow player={player} />
								</li>
							))}
						</motion.ul>
					))}
			</AnimatePresence>
		</LayoutGroup>
	</div>
);
