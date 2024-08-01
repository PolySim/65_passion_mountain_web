"use client";

import { PropsWithChildren } from "react";
import { toggleFavorite } from "@/utils/hikes/hikesAction";

const ToggleFavorite = ({
  isFavorite,
  hikingId,
  children,
}: PropsWithChildren<{
  isFavorite: boolean;
  hikingId: string;
}>) => {
  return (
    <div onClick={() => toggleFavorite(isFavorite, hikingId)}>{children}</div>
  );
};

export default ToggleFavorite;
