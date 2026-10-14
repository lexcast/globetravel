import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import { RADIUS, ROTATION, toVector } from "../../utils/globe";

const HEIGHT = 4;
const UP = new Vector3(0, 1, 0);

// A pin standing on the surface, with a ring pulsing around its base.
const Marker = ({ city, colors }) => {
  const pulse = useRef();
  const lat = Number(city.lat);
  const lng = Number(city.lng);

  const { position, quaternion } = useMemo(() => {
    const p = toVector(lat, lng, RADIUS);
    const q = new Quaternion().setFromUnitVectors(UP, p.clone().normalize());
    return { position: p, quaternion: q };
  }, [lat, lng]);

  // Offset each pin's phase so they don't all pulse in sync.
  const phase = useMemo(() => (Math.abs(lat * 7 + lng * 13) % 10) / 10, [lat, lng]);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.6 + phase) % 1;
    pulse.current.scale.setScalar(1 + t * 2.5);
    pulse.current.material.opacity = 0.6 * (1 - t);
  });

  return (
    <group rotation={ROTATION}>
      <group position={position} quaternion={quaternion}>
        <mesh ref={pulse} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
          <ringGeometry args={[0.7, 1, 32]} />
          <meshBasicMaterial color={colors.marker} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, HEIGHT / 2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, HEIGHT, 6]} />
          <meshBasicMaterial color={colors.marker} />
        </mesh>
        <mesh position={[0, HEIGHT, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color={colors.marker} />
        </mesh>
      </group>
    </group>
  );
};

export default Marker;
