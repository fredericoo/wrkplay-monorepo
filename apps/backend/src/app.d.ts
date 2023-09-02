/// <reference types="lucia" />
declare namespace Lucia {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	type Auth = import('./domains/auth/auth.service').Auth;
	type DatabaseUserAttributes = {};
	type DatabaseSessionAttributes = {};
}
