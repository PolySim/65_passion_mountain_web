import { CategoryInformation } from "@/types/Categories.type";
import { getCategoryState } from "@/utils/categories/categoriesAction";
import Image from "next/image";
import { CategoryIdStateStateId } from "@/routes";

const HikingSate = async ({
  category,
  index,
}: {
  category: CategoryInformation;
  index: number;
}) => {
  const states = await getCategoryState(category.id);

  return (
    <div className="flex flex-wrap gap-4 justify-around items-center">
      {states.map((state, i) => (
        <CategoryIdStateStateId.Link
          categoryId={category.id.toString()}
          stateId={state.id.toString()}
          legacyBehavior
          key={state.state}
        >
          <div className="relative flex justify-center items-center w-[135px] h-[80px] hover:scale-95 transition">
            <Image
              src={`${process.env.API_URL}/hiking/imageState/${state.path}`}
              alt={state.state}
              className="object-cover rounded-lg size-full"
              width={135}
              height={80}
            />
            <div className="flex justify-center items-center absolute top-0 left-0 size-full bg-black/20 rounded-lg cursor-pointer">
              <p className="font-bold text-melon text-base">{state.state}</p>
            </div>
          </div>
        </CategoryIdStateStateId.Link>
      ))}
    </div>
  );
};

export default HikingSate;
