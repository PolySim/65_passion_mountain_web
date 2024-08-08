import { z } from "zod";

export const Route = {
  name: "ApiAuthAuth0",
  params: z.object({
    auth0: z.string(),
  })
};

