import { HikingInformation } from "@/types/Hiking.type";
import ImagePosition from "@/components/admin/header/ImagePosition";
import ModalHikeInformation from "@/components/admin/ModalHikeInformation";
import { getDifficulties } from "@/utils/difficulty/difficultyAction";
import { getStates } from "@/utils/hikes/hikesAction";
import Image from "next/image";

const AdminHeader = async ({
  hiking,
  params,
}: {
  hiking: HikingInformation;
  params: { categoryId: string; hikingId: string };
}) => {
  const difficulties = await getDifficulties();
  const states = await getStates({ categoryId: params.categoryId });

  return (
    <div className="relative w-full h-[350px] bg-gray-400">
      <Image
        src={`${process.env.API_URL}/hiking/getImage/${hiking.main_image}`}
        alt={hiking.title}
        height={350}
        width={1280}
        className="object-cover size-full"
        style={{ objectPosition: `50% ${hiking.main_image_position}%` }}
      />
      <div className="flex absolute top-0 left-0 size-full">
        <div className="flex justify-between gap-2 mt-auto p-8 w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-4 mb-4">
              <ImagePosition position={hiking.main_image_position} />
              <ModalHikeInformation
                hikingId={params.hikingId}
                states={states}
                difficulties={difficulties}
                information={{
                  title: hiking.title,
                  difficulty: hiking.difficulty,
                  state: hiking.state,
                }}
              />
            </div>
            <div className="relative mb-2">
              <h2 className="text-white z-10 font-semibold font-rubik text-2xl md:text-4xl">
                {hiking.title}
              </h2>
              <span className="bg-filter" />
            </div>
            <div className="relative">
              <p className="text-white z-10 font-normal font-rubik text-sm md:text-base">
                {hiking.difficulty}
              </p>
              <span className="bg-filter" />
            </div>
            <div className="relative">
              <p className="text-white z-10 font-normal font-rubik text-sm md:text-base underline">
                {hiking.state}
              </p>
              <span className="bg-filter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
