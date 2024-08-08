"use server";

import { HikingExplore, HikingSearch } from "@/types/Hiking.type";
import { revalidateTag } from "next/cache";
import { UserService } from "@/service/UserService";
import { redirect } from "next/navigation";

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

export const getFavoriteHikes = async ({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) => {
  return (await fetch(`${process.env.API_URL}/hiking/getFavorites/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { tags: [`hikes_favorite_${userId}`] },
  }).then((res) => res.json())) as Promise<HikingExplore[]>;
};

export const addFavorite = async ({
  token,
  userId,
  hikeId,
}: {
  token: string;
  userId: string;
  hikeId: string;
}) => {
  return await fetch(`${process.env.API_URL}/user/addFavorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      hikingId: hikeId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result) revalidateTag(`hikes_favorite_${userId}`);
    });
};

export const removeFavorite = async ({
  token,
  userId,
  hikeId,
}: {
  token: string;
  userId: string;
  hikeId: string;
}) => {
  return await fetch(`${process.env.API_URL}/user/removeFavorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      hikingId: hikeId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result) revalidateTag(`hikes_favorite_${userId}`);
    });
};

export const toggleFavorite = async (isFavorite: boolean, hikingId: string) => {
  if (isFavorite) {
    await removeFavorite({
      token: (await UserService.idToken()) || "",
      userId: await UserService.id(),
      hikeId: hikingId,
    });
  } else {
    await addFavorite({
      token: (await UserService.idToken()) || "",
      userId: await UserService.id(),
      hikeId: hikingId,
    });
  }
};

export type State = {
  id: number;
  state: string;
  path: string;
};

export const getStates = async ({ categoryId }: { categoryId: string }) => {
  try {
    return (await fetch(
      `${process.env.API_URL}/hiking/hikesState/${categoryId}`,
      {},
    ).then((res) => res.json())) as Promise<State[]>;
  } catch (error) {
    return [] as State[];
  }
};

export const createHike = async ({
  title,
  difficulty,
  state,
  categoryId,
}: {
  title: string;
  difficulty: string;
  state: string;
  categoryId: string;
}) => {
  return await fetch(`${process.env.API_URL}/hiking/createAlbum`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
      difficulty,
      state,
      categoryId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.hikingId) {
        revalidateTag("hikes");
        revalidateTag(`hikes_${categoryId}`);
        revalidateTag(`hikes_${categoryId}_${state}`);
        redirect(`/admin/${categoryId}/${data.hikingId}`);
      } else {
        return "error";
      }
    });
};
