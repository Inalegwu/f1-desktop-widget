import { publicProcedure, router } from "@src/trpc";

const infoRouter = router({
  getStandings: publicProcedure.query(async () => {}),
  getCalender: publicProcedure.query(async () => {}),
});

export default infoRouter;
