import { HikingInformation } from "@/types/Hiking.type";

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
