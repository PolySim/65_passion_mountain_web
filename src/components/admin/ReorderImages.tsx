"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { debounce } from "next/dist/server/utils";
import { reorderImages } from "@/utils/images/imagesAction";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";
import EditImage from "@/components/admin/EditImage";

const arrayIsEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

const ReorderImages = ({
  defaultImages,
  mainImage,
  state,
}: {
  defaultImages: number[];
  mainImage: number | null;
  state: string;
}) => {
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

  useEffect(() => {
    setValue(defaultImages);
  }, [defaultImages]);

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
          <EditImage image={image} isMain={image === mainImage} state={state} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReorderImages;
