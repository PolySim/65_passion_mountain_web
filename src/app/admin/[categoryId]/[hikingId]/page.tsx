import AdminHeader from "@/components/admin/header/AdminHeader";
import { getGPX, getHiking } from "@/utils/hiking/hikingAction";
import EditStat from "@/components/admin/EditStat";
import EditContent from "@/components/admin/EditContent";
import React from "react";
import EditGpx from "@/components/admin/EditGpx"; // import EditImages from "@/components/admin/EditImages";
import dynamic from "next/dynamic";
import { getStates } from "@/utils/hikes/hikesAction";

const ReorderImages = dynamic(
  () => import("@/components/admin/ReorderImages"),
  { ssr: false },
);
const GPX = dynamic(() => import("@/components/hikes/GPX"), { ssr: false });
const EditImages = dynamic(() => import("@/components/admin/EditImages"), {
  ssr: false,
});
export default async function AdminHikePage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  const gpx = await getGPX({ hikingId: params.hikingId });
  const states = await getStates({ categoryId: params.categoryId });
  const state = states.find((state) => state.state === hiking.state);

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
          <ReorderImages
            defaultImages={hiking.images}
            mainImage={hiking.main_image}
            state={state?.id?.toString() || ""}
          />
          <EditImages />
        </div>
      </div>
    </div>
  );
}
