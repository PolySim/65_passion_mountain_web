import React from "react";
import { HikingInformation } from "@/types/Hiking.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Interest = ({
  hiking,
  hikingId,
  isGPX,
}: {
  hiking: HikingInformation;
  hikingId: string;
  isGPX: boolean;
}) => {
  return (
    <div className="ml-4 border-t border-gray-300 pt-4">
      <h6 className="text-green-dark font-bold">Tu es intéressé ?</h6>
      <div className="flex flex-wrap justify-start gap-x-8 gap-y-4 pt-4">
        {isGPX && (
          <Button variant="secondary" asChild>
            <Link
              href={`${process.env.API_URL}/hiking/gpx/${hikingId}`}
              download
            >
              Télécharger le GPX{" "}
            </Link>
          </Button>
        )}
        <Button>Ajouter le en favoris</Button>
      </div>
    </div>
  );
};

export default Interest;
