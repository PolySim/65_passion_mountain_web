"use server";

import { CategoryInformation, HikingState } from "@/types/Categories.type";

export const getCategories = async () => {
  return (await fetch(`${process.env.API_URL}/categories/getInformation`, {
    next: { tags: ["categories"] },
  }).then((res) => res.json())) as Promise<CategoryInformation[]>;
};

export const getCategoryState = async (categoryId: number) => {
  return (await fetch(
    `${process.env.API_URL}/hiking/hikesState/${categoryId}`,
    {
      next: { tags: [`categoryState_${categoryId}`] },
    },
  ).then((res) => res.json())) as Promise<HikingState[]>;
};
