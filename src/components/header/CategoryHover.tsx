"use client";

import { CategoryInformation } from "@/types/Categories.type";
import { useHeaderStore } from "@/store/headerStore";
import { cn } from "@/lib/utils";

const CategoryHover = ({
  category,
  index,
}: {
  category: CategoryInformation;
  index: number;
}) => {
  const categoryHover = useHeaderStore((state) => state.imageHover);
  const setCategoryHover = useHeaderStore((state) => state.setImageHover);

  return (
    <p
      className={cn("whitespace-nowrap font-bold cursor-pointer transition", {
        "text-green-dark": categoryHover === index,
      })}
      onMouseEnter={() => setCategoryHover(index)}
    >
      {category.name}
    </p>
  );
};

export default CategoryHover;
