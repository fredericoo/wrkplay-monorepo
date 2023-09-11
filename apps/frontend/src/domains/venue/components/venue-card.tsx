import { Badge } from '@wrkplay/ui';
import { Link } from 'react-router-dom';

import { DEFAULT_PITCH_TERMS } from '~/domains/pitch/pitch.constants';
import type { ListedVenue } from '~/domains/venue/venue.types';

type VenueCardProps = {
	venue: ListedVenue;
};
export const VenueCard = ({ venue }: VenueCardProps) => {
	const pitchTerm =
		venue._count.pitches === 1
			? venue.dict_pitch_singular || DEFAULT_PITCH_TERMS.singular
			: venue.dict_pitch_plural || DEFAULT_PITCH_TERMS.plural;
	return (
		<Link to={`/venues/${venue.id}`} className="relative block rounded-6 bg-background-lowest">
			<header className="relative isolate aspect-video overflow-hidden rounded-t-6 bg-background-strong-primary before:absolute before:inset-0 before:z-10 before:block before:bg-gradient-to-t before:opacity-50 before:content-[''] before:gradient-smooth-fade">
				{venue.cover_url ? <img className="absolute inset-0 h-full object-cover" src={venue.cover_url} alt="" /> : null}
			</header>

			<div className="relative -mt-6 flex flex-col gap-2 rounded-6 bg-background-lowest p-6">
				<h3 className="flex items-center gap-2 heading-md">
					{venue.name}{' '}
					<Badge>
						{venue._count.pitches} {pitchTerm}
					</Badge>
				</h3>
				{venue.description ? <p className="text-copy-lowcontrast-neutral body-sm">{venue.description}</p> : null}
				{venue.website ? <p className="text-copy-lowcontrast-neutral body-sm">{venue.website}</p> : null}
			</div>
		</Link>
	);
};
