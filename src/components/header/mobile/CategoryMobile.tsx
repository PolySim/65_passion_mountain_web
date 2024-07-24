"use client";

import { CategoryInformation } from "@/types/Categories.type";
import { useHeaderStore } from "@/store/headerStore";

const CategoryMobile = ({ category }: { category: CategoryInformation }) => {
  const toggleStateOpen = useHeaderStore((state) => state.toggleStateOpen);

  return category.withState ? (
    <p
      onClick={() => toggleStateOpen(category.id)}
      className="text-xl font-bold text-black font-rubik"
    >
      {category.name}
    </p>
  ) : (
    <p className="text-xl font-bold text-black font-rubik">{category.name}</p>
  );
};

export default CategoryMobile;
