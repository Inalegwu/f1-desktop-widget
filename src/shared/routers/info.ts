import { publicProcedure, router } from "@src/trpc";
import { graphql } from "@src/gql";

const GET_DRIVER_STANDINGS = `
  getDriverStandings{
    position
    points
    wins
    driver{
      permanentNumber
      givenName
      familyName
    }
  }
`;

const infoRouter = router({
  getStandings: publicProcedure.query(async ({ ctx }) => {
    const driverStandings = await ctx.client
      .get("", {
        data: {
          query: GET_DRIVER_STANDINGS,
        },
      })
      .then((response) => response.data);

    console.info({ driverStandings });

    return {
      driver: driverStandings,
    };
  }),
  getCalender: publicProcedure.query(async () => {}),
});

export default infoRouter;
