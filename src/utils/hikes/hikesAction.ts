"use server";

import { HikingExplore, HikingSearch } from "@/types/Hiking.type";

export const getHikes = async () => {
  return (await fetch(`${process.env.API_URL}/hiking/getAllHikes`, {
    next: { tags: ["hikes"] },
  }).then((res) => res.json())) as Promise<HikingSearch[]>;
};

export const getCategoryHikes = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  return (await fetch(`${process.env.API_URL}/hiking/hikes/${categoryId}`, {
    next: { tags: [`hikes_${categoryId}`] },
  }).then((res) => res.json())) as Promise<HikingExplore[]>;
};

export const getStateHikes = async ({
  categoryId,
  stateId,
}: {
  categoryId: string;
  stateId: string;
}) => {
  return (await fetch(
    `${process.env.API_URL}/hiking/hikes/${categoryId}/${stateId}`,
    {
      next: { tags: [`hikes_${categoryId}_${stateId}`] },
    },
  ).then((res) => res.json())) as Promise<HikingExplore[]>;
};

export const getFavoriteHikes = async ({ userId }: { userId: string }) => {
  return (await fetch(`${process.env.API_URL}/hiking/getFavorites/${userId}`, {
    next: { tags: [`hikes_favorite_${userId}`] },
  }).then((res) => res.json())) as Promise<HikingExplore[]>;
};
