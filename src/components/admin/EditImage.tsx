"use client";

import { Image as ImageSVG, RotateCw } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleRotate, updateMainImage } from "@/utils/images/imagesAction";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import DeleteImage from "@/components/admin/DeleteImage";

const EditImage = ({
  image,
  isMain,
  state,
}: {
  image: number;
  isMain: boolean;
  state: string;
}) => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const categoryId = params.categoryId as string;
  const [count, setCount] = useState(new Date().getTime());
  const { toast } = useToast();

  const onRotate = async () => {
    await toggleRotate({ hikingId, imageId: image }).then((res) => {
      if (res === "error") {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la rotation de l'image",
          variant: "destructive",
        });
      } else {
        setCount(new Date().getTime());
      }
    });
  };

  const onMain = async () => {
    await updateMainImage({ hikingId, imageId: image, categoryId, state }).then(
      (res) => {
        if (res === "error") {
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la modification de l'image principale",
            variant: "destructive",
          });
        }
      },
    );
  };

  return (
    <div className="relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/hiking/getImage/${image}?count=${count}`}
        alt={`image ${image}`}
        width={500}
        height={281}
        unoptimized
        className="aspect-video w-full object-cover rounded-lg cursor-grab"
      />
      <div className="absolute bottom-0 w-full flex justify-around items-center gap-4 bg-black/50 px-2 py-1 rounded-b-lg border-t-2 border-white/50">
        <DeleteImage image={image} hikingId={hikingId} isMain={isMain} />
        <Button
          variant="secondary"
          size="icon"
          disabled={isMain}
          onClick={onMain}
        >
          <ImageSVG />
        </Button>
        <Button variant="default" size="icon" onClick={onRotate}>
          <RotateCw />
        </Button>
      </div>
    </div>
  );
};

export default EditImage;
