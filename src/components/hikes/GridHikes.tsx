import { CategoryIdStateStateIdHikingId } from "@/routes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HikingExplore } from "@/types/Hiking.type";
import Grid from "@/components/ui/Grid";
import Card from "@/components/ui/Card";

const GridHikes = ({
  hikes,
  categoryId,
  stateId,
}: {
  hikes: HikingExplore[];
  categoryId: string;
  stateId?: string;
}) => {
  return (
    <Grid>
      {hikes.map((hiking) => (
        <CategoryIdStateStateIdHikingId.Link
          categoryId={categoryId}
          stateId={stateId || hiking.state_id?.toString() || "-1"}
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
              <Button variant="secondary">Voir le topo</Button>
            </div>
          </Card>
        </CategoryIdStateStateIdHikingId.Link>
      ))}
    </Grid>
  );
};

export default GridHikes;
