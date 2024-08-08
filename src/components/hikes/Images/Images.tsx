import React from "react";
import ImageContainer from "@/components/hikes/Images/ImageContainer";
import Image from "next/image";

const Images = ({ images, title }: { images: number[]; title: string }) => {
  return (images || []).map((image, index) => (
    <React.Fragment key={image}>
      <ImageContainer index={index}>
        <Image
          src={`${process.env.API_URL}/hiking/getImage/${image}`}
          alt={`image ${title} ${image}`}
          width={500}
          height={281}
          className="aspect-video w-full object-cover rounded-lg cursor-pointer"
        />
      </ImageContainer>
    </React.Fragment>
  ));
};

export default Images;
