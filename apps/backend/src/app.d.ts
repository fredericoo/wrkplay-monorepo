/// <reference types="lucia" />
declare namespace Lucia {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	type Auth = import('./domains/auth/auth.service').Auth;
	type DatabaseUserAttributes = {
		name: string;
		avatar_url: string;
	};
	type DatabaseSessionAttributes = { _: never };
}
