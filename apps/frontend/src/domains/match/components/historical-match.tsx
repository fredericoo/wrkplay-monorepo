import { Badge } from '@wrkplay/ui';

import { groupBy } from '~/domains/common/common.utils';
import { getRelativeTimeDifference } from '~/domains/format/format.date';
import { UserAvatar } from '~/domains/user/components';

import type { ListedMatch } from '../match.types';

type HistoricalMatchProps = { match: ListedMatch };

export const HistoricalMatch = ({ match }: HistoricalMatchProps) => {
	const timeAtRender = new Date();
	const playersBySide = groupBy(match.players, x => x.side);

	return (
		<div className="relative rounded-4 bg-background-lowest px-4 pb-3 pt-7 shadow-surface-md ring-1 ring-border-element-primary/5">
			<Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" variant="primary">
				{match.pitch.venue.name}
			</Badge>

			<div className="flex items-center gap-2 text-center">
				<ul aria-label="Side A players" className="order-1 flex flex-1 flex-col">
					{playersBySide.SIDE_A?.map(player => (
						<li key={player.id} className="flex flex-col items-center gap-2">
							<UserAvatar user={player.user} size="sm" />
							<span className="body-sm">{player.user.name}</span>
						</li>
					))}
				</ul>
				<ul aria-label="Side B players" className="order-3 flex flex-1 flex-col body-md">
					{playersBySide.SIDE_B?.map(player => (
						<li key={player.id} className="flex flex-col items-center gap-2">
							<UserAvatar user={player.user} size="sm" />
							<span className="body-sm">{player.user.name}</span>
						</li>
					))}
				</ul>
				<div aria-label="Scores" className="order-2 flex flex-grow gap-1">
					<div aria-label="Side A" className="flex-1 label-lg">
						{match.sideAScore}
					</div>
					<div className="text-icon-lowContrast-neutral">×</div>
					<div aria-label="Side B" className="flex-1 label-lg">
						{match.sideBScore}
					</div>
				</div>
			</div>
			<time className="block text-center text-copy-lowcontrast-neutral body-xs" dateTime={match.createdAt}>
				{getRelativeTimeDifference({ from: timeAtRender, to: match.createdAt })}
			</time>
		</div>
	);
};
