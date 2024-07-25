import React from "react";
import Image from "next/image";
import FullScreenImageContainer from "@/components/hikes/Images/FullScreenImageContainer";

const FullScreenImages = ({
  images,
  title,
}: {
  images: number[];
  title: string;
}) => {
  return (
    <FullScreenImageContainer imageLength={(images || []).length}>
      {(images || []).map((image, index) => (
        <div className="min-w-screen w-screen h-screen snap-center" key={image}>
          <Image
            src={`${process.env.API_URL}/hiking/getImage/${image}`}
            alt={`image ${title} ${image}`}
            width={1920}
            height={1080}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </FullScreenImageContainer>
  );
};

export default FullScreenImages;
