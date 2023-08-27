import { makeAction, redirect } from 'react-router-typesafe';
import { z } from 'zod';

import { api } from '~/domains/api/api.client';

const ActionSchema = z.object({
	joinTag: z.string(),
});

export const joinMatchAction = makeAction(async ({ request }) => {
	const formData = await request.formData();
	const data = ActionSchema.parse(Object.fromEntries(formData));

	console.log(data);

	const response = await api.match.join.mutate(data);

	if (response.success) {
		return redirect(`/match/${response.matchId}`);
	}

	return response;
});
