import { router } from "@src/trpc";
import infoRouter from "./info";

export const appRouter = router({
  info: infoRouter,
});

export type AppRouter = typeof appRouter;
