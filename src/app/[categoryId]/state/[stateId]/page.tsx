import { getStateHikes } from "@/utils/hikes/hikesAction";
import GridHikes from "@/components/hikes/GridHikes";

export default async function HikingStatePage({
  params,
}: {
  params: { categoryId: string; stateId: string };
}) {
  const hikes = await getStateHikes(params);

  return (
    <main className="flex-1 bg-yellow-light py-16 px-8">
      <GridHikes
        hikes={hikes}
        categoryId={params.categoryId}
        stateId={params.stateId}
      />
    </main>
  );
}
