import { getStateHikes } from "@/utils/hikes/hikesAction";
import GridHikes from "@/components/hikes/GridHikes";

export default async function HikingStatePage({
  params,
}: {
  params: { categoryId: string; stateId: string };
}) {
  const hikes = await getStateHikes(params);

  return (
    <GridHikes
      hikes={hikes}
      categoryId={params.categoryId}
      stateId={params.stateId}
    />
  );
}
