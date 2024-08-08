import { z } from "zod";

export const Route = {
  name: "AdminCategoryId",
  params: z.object({
    categoryId: z.string(),
  })
};

