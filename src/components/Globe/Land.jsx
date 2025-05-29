import React, { useEffect, useState } from "react";
import {
  loadMap,
  getImageData,
  visibilityForCoordinate,
  polar2Cartesian,
  ROTATION,
} from "../../utils/globe";

const Land = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const load = async () => {
      const image = await loadMap();
      const imageData = getImageData(image);

      const vertices = [];
      const D2R = Math.PI / 180;
      const rows = 120;
      for (let lat = -90; lat <= 90; lat += 180 / rows) {
        const t = Math.cos(Math.abs(lat) * D2R) * 25 * Math.PI * 2 * 2;
        for (let r = 0; r < t; r++) {
          const lng = (360 * r) / t - 180;
          if (!visibilityForCoordinate(lng, lat, imageData)) continue;

          const c = polar2Cartesian(lat, lng);
          vertices.push(c.x, c.y, c.z);
        }
      }
      setDots(new Float32Array(vertices));
    };

    load();
  }, []);

  return (
    <points rotation={ROTATION}>
      <bufferGeometry attach="geometry">
        {dots.length && (
          <bufferAttribute
            attach="attributes-position"
            count={dots.length / 3}
            array={dots}
            itemSize={3}
          />
        )}
      </bufferGeometry>
      <pointsMaterial size={1} color="#f4f4f5" />
    </points>
  );
};

export default Land;
