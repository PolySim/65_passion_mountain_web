"use client";

import { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { formatGPX } from "@/utils/gpx/gpx";

const GPX = ({ gpx }: { gpx: string }) => {
  const [positions, setPositions] = useState<[number, number][] | null>(null);
  const [positionCenter, setPositionCenter] = useState<number[] | null>(null);

  useEffect(() => {
    formatGPX({
      gpx,
      toggleCenter: setPositionCenter,
      togglePositions: setPositions,
    });
  }, [gpx]);

  return (
    positions &&
    positionCenter && (
      <div className="w-full aspect-video rounded-lg bg-green-300">
        <MapContainer
          key={positions[0].toString()}
          center={positionCenter as LatLngExpression}
          zoom={11.5}
          scrollWheelZoom={true}
          className="w-full aspect-video rounded-lg"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline
            pathOptions={{ fillColor: "red", color: "blue" }}
            positions={positions}
          />
        </MapContainer>
      </div>
    )
  );
};

export default GPX;
