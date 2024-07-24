import { getCategoryHikes, getFavoriteHikes } from "@/utils/hikes/hikesAction";
import { UserService } from "@/service/UserService";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

  return (
    <main className="flex-1 bg-yellow-light py-16 px-8">
      <div className="grid gap-8 md:gap-12 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto w-full">
        {hikes.map((hiking) => (
          <div
            className="shadow-md rounded-2xl overflow-hidden w-full h-full bg-white"
            key={hiking.id}
          >
            {hiking.main_image ? (
              <Image
                src={`${process.env.API_URL}/hiking/getImage/${hiking.main_image}`}
                alt={hiking.title}
                width={240}
                height={300}
                className="w-full h-[240px] object-cover"
              />
            ) : (
              <div className="w-full h-[240px] bg-green-light" />
            )}
            <div className="flex flex-col justify-center items-center gap-8 py-8 px-4">
              <h3 className="text-green-dark font-bebas text-xl tracking-[3px] font-bold">
                {hiking.title}
              </h3>
              <Button variant="secondary">Voir le topo</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
