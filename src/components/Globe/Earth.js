import React from "react";
import { RADIUS, ROTATION } from "utils/globe";

const Earth = () => (
  <mesh rotation={ROTATION}>
    <sphereBufferGeometry args={[RADIUS, 32, 32]} />
    <meshBasicMaterial color="#1F2937" />
  </mesh>
);

export default Earth;
