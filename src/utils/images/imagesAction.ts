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

export const reorderImages = async ({
  hikingId,
  images,
}: {
  hikingId: string;
  images: number[];
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/reorderImages`, {
      method: "PUT",
      body: JSON.stringify({ images }),
      headers: {
        "Content-Type": "application/json",
      },
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

export const updateMainImage = async ({
  hikingId,
  imageId,
  categoryId,
  state,
}: {
  hikingId: string;
  imageId: number;
  categoryId: string;
  state: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/updateMainImage`, {
      method: "PUT",
      body: JSON.stringify({
        hikingId: hikingId,
        mainImage: imageId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${hikingId}`);
          revalidateTag("hikes");
          revalidateTag(`hikes_${categoryId}`);
          revalidateTag(`hikes_${categoryId}_${state}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};

export const toggleRotate = async ({
  hikingId,
  imageId,
}: {
  hikingId: string;
  imageId: number;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/rotate/${imageId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

export const deleteImage = async ({
  imageId,
  hikingId,
}: {
  imageId: number;
  hikingId: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/deleteImage`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hikingId,
        imageId,
      }),
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
