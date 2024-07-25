import { getGPX, getHiking } from "@/utils/hiking/hikingAction";
import HeaderHiking from "@/components/hikes/hearderHinkig";
import React from "react";
import Images from "@/components/hikes/Images/Images";
import FullScreenImages from "@/components/hikes/Images/FullScreenImages";
import Stats from "@/components/hikes/Information/Stats";
import Information from "@/components/hikes/Information/Information";
import Interest from "@/components/hikes/Information/Interest";
// import GPX from "@/components/hikes/GPX";
import dynamic from "next/dynamic";

const GPX = dynamic(() => import("@/components/hikes/GPX"), { ssr: false });

export default async function HikingPage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  const gpx = await getGPX({ hikingId: params.hikingId });
  return (
    <main className="flex-1 bg-yellow-light py-16 px-8">
      <FullScreenImages images={hiking.images} title={hiking.title} />
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
        <HeaderHiking hiking={hiking} />
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex flex-col gap-8 flex-1 p-4">
            <Stats hiking={hiking} />
            <Information hiking={hiking} />
            <Interest
              hiking={hiking}
              isGPX={gpx !== null}
              hikingId={params.hikingId}
            />
          </div>
          <div className="flex flex-col gap-4 lg:border-l lg:border-gray-300 w-full lg:w-4/12 p-4">
            {gpx !== null && <GPX gpx={gpx} />}
            <Images images={hiking.images} title={hiking.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
