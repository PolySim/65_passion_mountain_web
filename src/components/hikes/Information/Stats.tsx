import { HikingInformation } from "@/types/Hiking.type";

const Stats = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <div className="flex justify-between flex-wrap items-center gap-4 w-full px-4">
      <div className="flex flex-col gap-1">
        <p>Distance</p>
        <p>{hiking.length || 0} km</p>
      </div>
      <div className="flex flex-col gap-1">
        <p>Dénivelé</p>
        <p>{hiking.elevation || 0} m</p>
      </div>
      <div className="flex flex-col gap-1">
        <p>Durée</p>
        <p>{hiking.duration || "00:00"}</p>
      </div>
    </div>
  );
};

export default Stats;
