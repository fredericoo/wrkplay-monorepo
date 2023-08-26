import { z } from "zod";

import { db } from "../domains/db/db.client";
import { router } from "../trpc";
import { authorizedProcedure } from "../domains/auth/auth.middleware";

export const userRouter = router({
  getById: authorizedProcedure.input(z.string()).query(async ({ input }) => {
    return await db.user.findUnique({ where: { id: input } });
  }),
});
