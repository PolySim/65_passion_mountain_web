import { getCategoryHikes, getFavoriteHikes } from "@/utils/hikes/hikesAction";
import { UserService } from "@/service/UserService";

const getHikes = async (categoryId: string) => {
  "use server";
  switch (categoryId) {
    case "favorite":
      return await getFavoriteHikes({ userId: await UserService.id() });
    default:
      return await getCategoryHikes({ categoryId: categoryId });
  }
};

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const hikes = await getHikes(params.categoryId);

  return <main className="flex-1"></main>;
}
