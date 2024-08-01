import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ToggleFavorite from "@/components/hikes/ToggleFavorite";

const Interest = ({
  hikingId,
  isGPX,
  isFavorite,
}: {
  hikingId: string;
  isGPX: boolean;
  isFavorite: boolean;
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
              Télécharger le GPX
            </Link>
          </Button>
        )}
        <ToggleFavorite isFavorite={isFavorite} hikingId={hikingId}>
          <Button>
            {isFavorite ? "Retirer de mes favoris" : "Ajouter en favori"}
          </Button>
        </ToggleFavorite>
      </div>
    </div>
  );
};

export default Interest;
