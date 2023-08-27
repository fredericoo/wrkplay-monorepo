import type { api } from '~/domains/api/api.client';

export type ListedMatch = Awaited<ReturnType<typeof api.match.list.query>>[number];
export type MatchPlayer = Awaited<ReturnType<typeof api.match.getById.query>>['match']['players'][number];
