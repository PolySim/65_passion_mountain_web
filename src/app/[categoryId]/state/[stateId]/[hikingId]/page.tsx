import { getHiking } from "@/utils/hiking/hikingAction";
import HeaderHiking from "@/components/hikes/hearderHinkig";
import React from "react";
import Images from "@/components/hikes/Images/Images";
import FullScreenImages from "@/components/hikes/Images/FullScreenImages";

export default async function HikingPage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  return (
    <main className="flex-1 bg-yellow-light py-16 px-8">
      <FullScreenImages images={hiking.images} title={hiking.title} />
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
        <HeaderHiking hiking={hiking} />
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1 "></div>
          <div className="flex flex-col gap-4 lg:border-l lg:border-gray-300 w-full lg:w-4/12 p-4">
            <Images images={hiking.images} title={hiking.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
