import React, { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import { RADIUS, toVector } from "utils/globe";

const Marker = ({ city }) => {
  const { lat, lng } = city;

  const curve = useMemo(() => {
    const s = toVector(lat, lng, RADIUS);
    const e = toVector(lat, lng, RADIUS + 5);

    return new CatmullRomCurve3([s, e]);
  }, [lat, lng]);

  return (
    <mesh>
      <tubeBufferGeometry args={[curve, 44, 0.3, 8]} />
      <meshBasicMaterial color="#FCD34D" />
    </mesh>
  );
};

export default Marker;
