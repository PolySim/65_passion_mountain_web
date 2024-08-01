import { HikingInformation } from "@/types/Hiking.type";

const Stats = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <div className="flex justify-around flex-wrap items-center gap-4 w-full">
      {hiking.length && (
        <div className="flex flex-col gap-1">
          <p>Distance</p>
          <p>{hiking.length} km</p>
        </div>
      )}
      {hiking.elevation && (
        <div className="flex flex-col gap-1">
          <p>Dénivelé</p>
          <p>{hiking.elevation} m</p>
        </div>
      )}
      {hiking.duration && (
        <div className="flex flex-col gap-1">
          <p>Durée</p>
          <p>{hiking.duration}</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
