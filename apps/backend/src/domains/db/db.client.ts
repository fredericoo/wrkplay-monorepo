import { PrismaClient } from '@prisma/client';

let db: PrismaClient;
declare global {
	// eslint-disable-next-line no-var
	var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
	db = new PrismaClient();
	void db.$connect();
} else {
	if (!global.__db) {
		global.__db = new PrismaClient();
		void global.__db.$connect();
	}
	db = global.__db;
}

export { db };
