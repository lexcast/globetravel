import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RADIUS } from "../../utils/globe";
import GLOBE_THEMES from "./theme";
import Earth from "./Earth";
import Atmosphere from "./Atmosphere";
import Land from "./Land";
import Marker from "./Marker";
import Path from "./Path";
import Curve from "./Curve";

// Share of the shortest canvas side taken by the globe's diameter.
const FIT = 0.78;

// Keeps the globe fitted to the canvas whenever it is resized.
const FitZoom = () => {
  const get = useThree((state) => state.get);
  const { width, height } = useThree((state) => state.size);

  useEffect(() => {
    const { camera } = get();
    camera.zoom = (Math.min(width, height) * FIT) / (RADIUS * 2);
    camera.updateProjectionMatrix();
  }, [get, width, height]);

  return null;
};

const Globe = ({ cities, travels, hideCities, hideTravels, hideFlights, theme }) => {
  const colors = GLOBE_THEMES[theme] ?? GLOBE_THEMES.dark;

  return (
    <Canvas
      orthographic
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 0, 200], zoom: 3 }}
      aria-label="3D globe with your cities and travels"
    >
      <FitZoom />
      <Atmosphere colors={colors} />
      <Earth colors={colors} />
      <Land colors={colors} />
      {!hideCities &&
        cities.map((city) => (
          <Marker key={city.geonameId} city={city} colors={colors} />
        ))}
      {travels.map((travel) =>
        travel.type === "flight"
          ? !hideFlights && <Curve key={travel.id} travel={travel} colors={colors} />
          : !hideTravels && <Path key={travel.id} travel={travel} />
      )}
      <OrbitControls
        enablePan={false}
        enableDamping
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />
    </Canvas>
  );
};

export default Globe;
