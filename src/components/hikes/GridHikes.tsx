import { CategoryIdStateStateIdHikingId } from "@/routes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HikingExplore } from "@/types/Hiking.type";

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
    <div className="grid gap-8 md:gap-12 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto w-full">
      {hikes.map((hiking) => (
        <CategoryIdStateStateIdHikingId.Link
          categoryId={categoryId}
          stateId={stateId || hiking.state_id?.toString() || "-1"}
          hikingId={hiking.id.toString()}
          key={hiking.id}
          legacyBehavior
        >
          <div className="shadow-md rounded-2xl overflow-hidden w-full h-full bg-white hover:scale-105 transition duration-300">
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
        </CategoryIdStateStateIdHikingId.Link>
      ))}
    </div>
  );
};

export default GridHikes;
