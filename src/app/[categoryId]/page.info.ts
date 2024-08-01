import { z } from "zod";

export const Route = {
  name: "CategoryId",
  params: z.object({
    categoryId: z.string(),
  })
};

