import React, { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import { polar2Cartesian, RADIUS, toVector, ROTATION } from "../../utils/globe";

const Marker = ({ city }) => {
  const { lat, lng } = city;

  const curve = useMemo(() => {
    const s = toVector(lat, lng, RADIUS);
    const e = toVector(lat, lng, RADIUS + 5);

    return new CatmullRomCurve3([s, e]);
  }, [lat, lng]);

  const point = useMemo(() => {
    const p = polar2Cartesian(lat, lng, RADIUS + 5);

    return [p.x, p.y, p.z];
  }, [lat, lng]);

  return (
    <mesh rotation={ROTATION}>
      <mesh>
        <tubeGeometry args={[curve, 44, 0.2, 8]} />
        <meshBasicMaterial color="#fcd34d" />
      </mesh>
      <mesh position={point}>
        <sphereGeometry args={[0.5, 5, 5]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </mesh>
  );
};

export default Marker;
