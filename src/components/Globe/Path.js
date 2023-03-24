import React, { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import { RADIUS, toVector, ROTATION } from "utils/globe";
import { geoInterpolate } from "d3";

const TYPES = {
  trail: "#10B981",
  sail: "#06B6D4",
  bus: "#F472B6",
  car: "#F59E0B",
};

const Path = ({ travel }) => {
  const curve = useMemo(() => {
    const { start, end } = travel;

    const startXYZ = toVector(start.lat, start.lng, RADIUS + 0.3);
    const endXYZ = toVector(end.lat, end.lng, RADIUS + 0.3);

    const controls = [startXYZ];

    const d3Interpolate = geoInterpolate(
      [start.lng, start.lat],
      [end.lng, end.lat]
    );

    for (let i = 1; i < 6; i++) {
      const c = d3Interpolate((1 / 7) * i);
      controls.push(toVector(c[1], c[0], RADIUS + 0.3));
    }

    controls.push(endXYZ);

    return new CatmullRomCurve3(controls);
  }, [travel]);

  return (
    <mesh rotation={ROTATION}>
      <tubeGeometry args={[curve, 44, 0.3, 8]} />
      <meshBasicMaterial color={TYPES[travel.type]} />
    </mesh>
  );
};

export default Path;
