"use client";

import { PropsWithChildren } from "react";
import { useHeaderStore } from "@/store/headerStore";

const ImageVisible = ({
  children,
  index,
}: PropsWithChildren<{ index: number }>) => {
  const imageHover = useHeaderStore((state) => state.imageHover);

  return imageHover === index && <>{children}</>;
};

export default ImageVisible;
