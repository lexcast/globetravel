import React, { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import { RADIUS, toVector } from "utils/globe";
import { geoInterpolate } from "d3";

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
    <mesh>
      <tubeBufferGeometry args={[curve, 44, 0.3, 8]} />
      <meshBasicMaterial
        color={travel.type === "trail" ? "#10B981" : "#3B82F6"}
      />
    </mesh>
  );
};

export default Path;
