import { groupBy } from '~/domains/common/common.utils';
import { getRelativeTimeDifference } from '~/domains/format/format.date';

import type { ListedMatch } from '../match.types';

type HistoricalMatchProps = { match: ListedMatch };

export const HistoricalMatch = ({ match }: HistoricalMatchProps) => {
	const timeAtRender = new Date();
	const playersBySide = groupBy(match.players, x => x.side);

	return (
		<div className="relative rounded-lg border border-border-subtle-neutral bg-background-subtle-neutral p-4">
			<time
				className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle-neutral bg-background-subtle-neutral px-2 py-1 text-copy-lowcontrast-neutral body-xs"
				dateTime={match.createdAt}
			>
				{getRelativeTimeDifference({ from: timeAtRender, to: match.createdAt })}
			</time>
			<div className="grid grid-cols-2 gap-2">
				<ul>{playersBySide.SIDE_A?.map(player => <li key={player.id}>{player.user.name}</li>)}</ul>
				<ul>{playersBySide.SIDE_B?.map(player => <li key={player.id}>{player.user.name}</li>)}</ul>
			</div>
			<p className="text-center text-copy-lowcontrast-neutral body-sm">
				<span className="text-icon-highContrast-neutral">{match.pitch.name}</span> at{' '}
				<span className="text-icon-highContrast-neutral">{match.pitch.venue.name}</span>
			</p>
		</div>
	);
};
