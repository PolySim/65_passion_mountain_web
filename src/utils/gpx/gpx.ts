import gpxParser from "gpxparser";

export const formatGPX = ({
  gpx,
  toggleCenter,
  togglePositions,
}: {
  gpx: string;
  togglePositions: (positions: [number, number][]) => any;
  toggleCenter: (position: number[]) => any;
}) => {
  const parser = new gpxParser();
  parser.parse(gpx);
  togglePositions(
    parser.tracks[0].points.map((point) => [point.lat, point.lon]),
  );
  toggleCenter(
    parser.tracks[0].points
      .map((point) => [point.lat, point.lon])
      .reduce(
        (acc, curr: number[]) => [acc[0] + curr[0], acc[1] + curr[1]],
        [0, 0],
      )
      .map((elt) => elt / parser.tracks[0].points.length),
  );
};
