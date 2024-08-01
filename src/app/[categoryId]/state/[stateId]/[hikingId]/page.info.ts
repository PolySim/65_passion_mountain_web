import { z } from "zod";

export const Route = {
  name: "CategoryIdStateStateIdHikingId",
  params: z.object({
    categoryId: z.string(),
    stateId: z.string(),
    hikingId: z.string(),
  })
};

