import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";
import Land from "./Land";
import Marker from "./Marker";
import Path from "./Path";
import Curve from "./Curve";

const Globe = ({ cities, travels }) => {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 200] }}>
      <Earth />
      <Land />
      {cities.map((city) => (
        <Marker key={city.geonameId} city={city} />
      ))}
      {travels.map((travel) =>
        travel.type === "flight" ? (
          <Curve key={travel.id} travel={travel} />
        ) : (
          <Path key={travel.id} travel={travel} />
        )
      )}
      <OrbitControls enablePan enableRotate autoRotate />
    </Canvas>
  );
};

export default Globe;
