"use server";

import { HikingSearch } from "@/types/Hiking.type";

export const getHikes = async () => {
  return (await fetch(`${process.env.API_URL}/hiking/getAllHikes`, {
    next: { tags: ["hikes"] },
  }).then((res) => res.json())) as Promise<HikingSearch[]>;
};
