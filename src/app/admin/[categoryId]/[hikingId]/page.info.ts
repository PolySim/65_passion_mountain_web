import { z } from "zod";

export const Route = {
  name: "AdminCategoryIdHikingId",
  params: z.object({
    categoryId: z.string(),
    hikingId: z.string(),
  })
};

