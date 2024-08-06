import AdminHeader from "@/components/admin/header/AdminHeader";
import { getGPX, getHiking } from "@/utils/hiking/hikingAction";
import EditStat from "@/components/admin/EditStat";
import EditContent from "@/components/admin/EditContent";
import React from "react";
import GPX from "@/components/hikes/GPX";
import EditGpx from "@/components/admin/EditGpx";
import Images from "@/components/hikes/Images/Images";
import EditImages from "@/components/admin/EditImages";

export default async function AdminHikePage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  const gpx = await getGPX({ hikingId: params.hikingId });
  return (
    <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
      <AdminHeader hiking={hiking} params={params} />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col gap-8 flex-1 p-4">
          <EditStat
            distance={hiking.length?.toString()}
            elevation={hiking.elevation?.toString()}
            duration={hiking.duration}
          />
          <EditContent
            description={hiking.content}
            indication={hiking.indication}
          />
        </div>
        <div className="flex flex-col gap-4 lg:border-l lg:border-gray-300 w-full lg:w-4/12 p-4">
          <EditGpx />
          {gpx !== null && gpx !== '"Get gpx error"' && <GPX gpx={gpx} />}
          <Images images={hiking.images} title="hello" />
          <EditImages />
        </div>
      </div>
    </div>
  );
}
