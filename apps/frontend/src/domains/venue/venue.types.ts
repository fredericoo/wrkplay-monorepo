import type { api } from '~/domains/api/api.client';

export type VenueList = Awaited<ReturnType<typeof api.venue.list.query>>;
export type ListedVenue = VenueList[number];
