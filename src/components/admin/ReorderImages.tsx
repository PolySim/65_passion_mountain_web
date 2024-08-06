"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { debounce } from "next/dist/server/utils";
import { reorderImages } from "@/utils/images/imagesAction";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import React from "react";

const arrayIsEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

const ReorderImages = ({ defaultImages }: { defaultImages: number[] }) => {
  const params = useParams();
  const hikingId = params.hikingId as string;
  const { toast } = useToast();
  const [containerRef, images, setValue] = useDragAndDrop<
    HTMLDivElement,
    number
  >(defaultImages, {
    handleEnd: () => {
      void onSubmit(images);
    },
  });

  const onSubmit = debounce(async (images: number[]) => {
    if (arrayIsEqual(images, defaultImages)) return;

    await reorderImages({ hikingId, images }).then((res) => {
      if (res === "error") {
        toast({
          title: "Error",
          description: "Erreur lors de la réorganisation des images",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Les images ont été réorganisées avec succès",
        });
      }
    });
  }, 1000);

  return (
    <div ref={containerRef} className="w-full h-auto space-y-4">
      {(images || []).map((image, index) => (
        <React.Fragment key={image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/hiking/getImage/${image}`}
            alt={`image ${image}`}
            width={500}
            height={281}
            className="aspect-video w-full object-cover rounded-lg cursor-grab"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReorderImages;
