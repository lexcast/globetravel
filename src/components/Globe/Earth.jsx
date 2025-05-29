import React from "react";
import { RADIUS, ROTATION } from "../../utils/globe";

const Earth = () => (
  <mesh rotation={ROTATION}>
    <sphereGeometry args={[RADIUS, 32, 32]} />
    <meshBasicMaterial color="#27272a" />
  </mesh>
);

export default Earth;
