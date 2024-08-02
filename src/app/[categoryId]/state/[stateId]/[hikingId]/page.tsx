import { getGPX, getHiking } from "@/utils/hiking/hikingAction";
import HeaderHiking from "@/components/hikes/hearderHinkig";
import React from "react";
import Images from "@/components/hikes/Images/Images";
import FullScreenImages from "@/components/hikes/Images/FullScreenImages";
import Stats from "@/components/hikes/Information/Stats";
import Information from "@/components/hikes/Information/Information";
import Interest from "@/components/hikes/Information/Interest";
import dynamic from "next/dynamic";
import { getFavoriteHikes } from "@/utils/hikes/hikesAction";
import { UserService } from "@/service/UserService";

const GPX = dynamic(() => import("@/components/hikes/GPX"), { ssr: false });

export default async function HikingPage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  const gpx = await getGPX({ hikingId: params.hikingId });
  const favorites = await getFavoriteHikes({
    token: (await UserService.idToken()) || "",
    userId: await UserService.id(),
  });

  const isFavorite = !!favorites.find(
    (favorite) => favorite.id.toString() === params.hikingId,
  );

  return (
    <>
      <FullScreenImages images={hiking.images} title={hiking.title} />
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
        <HeaderHiking
          hiking={hiking}
          isFavorite={isFavorite}
          hikingId={params.hikingId}
        />
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex flex-col gap-8 flex-1 p-4">
            <Stats hiking={hiking} />
            <Information hiking={hiking} />
            <Interest
              isGPX={!(gpx === null || gpx === '"Get gpx error"')}
              hikingId={params.hikingId}
              isFavorite={isFavorite}
            />
          </div>
          <div className="flex flex-col gap-4 lg:border-l lg:border-gray-300 w-full lg:w-4/12 p-4">
            {gpx !== null && gpx !== '"Get gpx error"' && <GPX gpx={gpx} />}
            <Images images={hiking.images} title={hiking.title} />
          </div>
        </div>
      </div>
    </>
  );
}
