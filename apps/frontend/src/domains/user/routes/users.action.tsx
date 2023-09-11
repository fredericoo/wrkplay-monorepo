import { makeAction } from 'react-router-typesafe';
import { z } from 'zod';

const ActionSchema = z.object({ userId: z.string() });

export const usersAction = makeAction(async ({ request }) => {
	const formData = await request.formData();
	const data = ActionSchema.parse(Object.fromEntries(formData));

	localStorage.setItem('token', data.userId);

	return { success: true };
});
