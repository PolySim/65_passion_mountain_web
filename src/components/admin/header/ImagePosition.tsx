"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { updateImagePosition } from "@/utils/hiking/hikingAction";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ImagePosition = ({ position }: { position: number }) => {
  const params = useParams();
  const hikingId = params.hikingId as string;

  const togglePosition = async (increment: boolean) => {
    if (increment) {
      await updateImagePosition({ hikingId: hikingId, position: position + 1 });
    } else {
      await updateImagePosition({ hikingId: hikingId, position: position - 1 });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="p-0 h-fit">
        <ChevronUp onClick={() => togglePosition(true)} />
      </Button>
      <Button variant="outline" className="p-0 h-fit">
        <ChevronDown onClick={() => togglePosition(false)} />
      </Button>
    </div>
  );
};

export default ImagePosition;
