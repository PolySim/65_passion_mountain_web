"use client";

import { PropsWithChildren } from "react";
import { useHikingStore } from "@/store/hikingStore";

const ImageContainer = ({
  children,
  index,
}: PropsWithChildren<{ index: number }>) => {
  const setImageIndexOpen = useHikingStore((state) => state.setImageIndexOpen);

  return (
    <div onClick={() => setImageIndexOpen(index)} className="w-full h-auto">
      {children}
    </div>
  );
};

export default ImageContainer;
