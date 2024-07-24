import { HikingInformation } from "@/types/Hiking.type";
import { Star } from "lucide-react";
import Image from "next/image";
import WindowSizeContainer from "@/service/WindowSizeContainer";
import { cn } from "@/lib/utils";

const HeaderHiking = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <div className="relative w-full h-[350px] bg-gray-400">
      <Image
        src={`${process.env.API_URL}/hiking/getImage/${hiking.main_image}`}
        alt={hiking.title}
        height={350}
        width={1280}
        className="object-cover size-full"
        style={{ objectPosition: `50% ${hiking.main_image_position}` }}
      />
      <div className="flex absolute top-0 left-0 size-full">
        <div className="flex justify-between gap-2 mt-auto p-8 w-full">
          <div className="flex flex-col gap-1">
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
          <WindowSizeContainer minWidth={768}>
            <Star className={cn("text-green-light w-10 h-10 cursor-pointer")} />
          </WindowSizeContainer>
        </div>
      </div>
    </div>
  );
};

export default HeaderHiking;
