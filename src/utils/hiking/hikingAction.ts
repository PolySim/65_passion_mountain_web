"use server";

import { HikingInformation } from "@/types/Hiking.type";
import { revalidateTag } from "next/cache";

export const getHiking = async ({ hikingId }: { hikingId: string }) => {
  return (await fetch(
    `${process.env.API_URL}/hiking/getHikingInformation/${hikingId}`,
    {
      next: { tags: [`hiking_${hikingId}`] },
    },
  ).then((res) => res.json())) as Promise<HikingInformation>;
};

export const getGPX = async ({ hikingId }: { hikingId: string }) => {
  return await fetch(`${process.env.API_URL}/hiking/gpx/${hikingId}`, {
    next: { tags: [`gpx${hikingId}`] },
  })
    .then((res) => res.text())
    .then((data) => (data === "Get gpx error" ? null : data));
};

export const updateImagePosition = async ({
  hikingId,
  position,
}: {
  hikingId: string;
  position: number;
}) => {
  return await fetch(`${process.env.API_URL}/hiking/updateMainImagePosition`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      hikingId,
      newPosition: position,
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
};

export const updateHeader = async ({
  title,
  difficulty,
  state,
  lastState,
  categoryId,
  hikingId,
}: {
  title: string;
  difficulty: string;
  state: string;
  categoryId: string;
  lastState: string;
  hikingId: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/updateHeader`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        title,
        difficulty,
        state,
        hikingId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${hikingId}`);
          revalidateTag("hikes");
          revalidateTag(`hikes_${categoryId}`);
          revalidateTag(`hikes_${categoryId}_${state}`);
          revalidateTag(`hikes_${categoryId}_${lastState}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};

export const updateStats = async (props: {
  distance: string;
  elevation: string;
  time: string;
  hikingId: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/updateStatistical`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(props),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${props.hikingId}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};

export const updateContent = async (props: {
  description: string;
  indication: string;
  hikingId: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/updateContent`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(props),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${props.hikingId}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};

export const uploadGPX = async (props: {
  file: FormData;
  hikingId: string;
}) => {
  try {
    await fetch(`${process.env.API_URL}/hiking/uploadGPX/${props.hikingId}`, {
      method: "POST",
      body: props.file,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          revalidateTag(`hiking_${props.hikingId}`);
        } else {
          return "error";
        }
      });
  } catch (error) {
    return "error";
  }
};
