import React from "react";
import { RADIUS } from "utils/globe";

const Earth = () => (
  <mesh>
    <sphereBufferGeometry args={[RADIUS, 32, 32]} />
    <meshBasicMaterial color="#1F2937" />
  </mesh>
);

export default Earth;
