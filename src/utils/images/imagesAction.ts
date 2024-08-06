"use server";

import { revalidateTag } from "next/cache";

export const uploadImages = async (files: FormData, hikingId: string) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/downloadImages/${hikingId}`, {
      method: "POST",
      body: files,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${hikingId}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};
