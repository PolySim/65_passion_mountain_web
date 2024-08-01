import { z } from "zod";

export const Route = {
  name: "CategoryIdStateStateId",
  params: z.object({
    categoryId: z.string(),
    stateId: z.string(),
  })
};

