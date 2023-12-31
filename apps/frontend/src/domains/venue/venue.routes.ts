import type { RouteObject } from 'react-router-dom';

import { venuesLoader } from '~/domains/venue/routes/venues.loader';
import { VenuesPage } from '~/domains/venue/routes/venues.page';

export const venuePages: RouteObject[] = [{ path: '/venues', loader: venuesLoader, Component: VenuesPage }];
