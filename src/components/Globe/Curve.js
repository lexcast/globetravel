import React, { useMemo } from "react";
import { CubicBezierCurve3 } from "three";
import { RADIUS, toVector, ROTATION } from "utils/globe";
import { geoInterpolate } from "d3";

const Curve = ({ travel }) => {
  const curve = useMemo(() => {
    const { start, end } = travel;

    const startXYZ = toVector(start.lat, start.lng, RADIUS);
    const endXYZ = toVector(end.lat, end.lng, RADIUS);

    const d3Interpolate = geoInterpolate(
      [start.lng, start.lat],
      [end.lng, end.lat]
    );
    const c1 = d3Interpolate(0.25);
    const c2 = d3Interpolate(0.75);

    const arcHeight = startXYZ.distanceTo(endXYZ) * 0.5 + RADIUS;
    const controlXYZ1 = toVector(c1[1], c1[0], arcHeight);
    const controlXYZ2 = toVector(c2[1], c2[0], arcHeight);

    return new CubicBezierCurve3(startXYZ, controlXYZ1, controlXYZ2, endXYZ);
  }, [travel]);

  return (
    <mesh rotation={ROTATION}>
      <tubeBufferGeometry args={[curve, 44, 0.3, 8]} />
      <meshBasicMaterial color="#EF4444" />
    </mesh>
  );
};

export default Curve;
