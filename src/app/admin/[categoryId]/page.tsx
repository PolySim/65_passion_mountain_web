import { getCategoryHikes, getStates } from "@/utils/hikes/hikesAction";
import Grid from "@/components/ui/Grid";
import { AdminCategoryIdHikingId } from "@/routes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import CreateHike from "@/components/admin/CreateHike";
import { getDifficulties } from "@/utils/difficulty/difficultyAction";

export default async function AdminCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const hikes = await getCategoryHikes({ categoryId: params.categoryId });
  const difficulties = await getDifficulties();
  const states = await getStates({ categoryId: params.categoryId });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
      <CreateHike difficulties={difficulties} states={states} />
      <Grid>
        {hikes.map((hiking) => (
          <AdminCategoryIdHikingId.Link
            categoryId={params.categoryId}
            hikingId={hiking.id.toString()}
            key={hiking.id}
            legacyBehavior
          >
            <Card>
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
                <Button variant="secondary">Modifier l&apos;activité</Button>
              </div>
            </Card>
          </AdminCategoryIdHikingId.Link>
        ))}
      </Grid>
    </div>
  );
}
