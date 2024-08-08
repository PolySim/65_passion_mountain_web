import { getCategoryHikes, getFavoriteHikes } from "@/utils/hikes/hikesAction";
import { UserService } from "@/service/UserService";
import GridHikes from "@/components/hikes/GridHikes";

const getHikes = async (categoryId: string) => {
  "use server";
  switch (categoryId) {
    case "favorite":
      return await getFavoriteHikes({
        token: (await UserService.idToken()) || "",
        userId: await UserService.id(),
      });
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

  return <GridHikes hikes={hikes} categoryId={params.categoryId} />;
}
