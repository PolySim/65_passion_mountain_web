import { getCategoryHikes, getFavoriteHikes } from "@/utils/hikes/hikesAction";
import { UserService } from "@/service/UserService";
import GridHikes from "@/components/hikes/GridHikes";
import { useUserStore } from "@/store/userStore";

const getHikes = async (categoryId: string, idToken: string) => {
  "use server";
  switch (categoryId) {
    case "favorite":
      return await getFavoriteHikes({
        token: idToken,
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
  const idToken = useUserStore.getState().idToken;
  console.log("idToken", idToken);
  const hikes = await getHikes(params.categoryId, idToken || "");

  return <GridHikes hikes={hikes} categoryId={params.categoryId} />;
}
