"use server";

export type Difficulty = { id: number; difficulty: string };

export const getDifficulties = async () => {
  try {
    return await fetch(`${process.env.API_URL}/difficulty/getAll`).then(
      (res) => res.json() as Promise<Difficulty[]>,
    );
  } catch (error) {
    return [] as Difficulty[];
  }
};
