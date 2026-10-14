import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { geoDistance } from "d3";
import { RADIUS, greatCircleCurve, ROTATION } from "../../utils/globe";
import TRAVEL_TYPES from "../../utils/travelTypes";

const COLOR = TRAVEL_TYPES.flight.color;

// Peak height grows with distance; sin(PI * t) lifts off and lands smoothly.
const altitude = (t, angle) =>
  0.4 + RADIUS * (0.04 + 0.3 * (angle / Math.PI)) * Math.sin(Math.PI * t);

// Flight arc over the great circle, with a plane-dot flying along it.
const Curve = ({ travel, colors }) => {
  const dot = useRef();

  const { curve, speed } = useMemo(() => {
    const angle = geoDistance(
      [Number(travel.start.lng), Number(travel.start.lat)],
      [Number(travel.end.lng), Number(travel.end.lat)]
    );

    return {
      curve: greatCircleCurve(travel.start, travel.end, altitude),
      // Roughly constant speed regardless of the arc length.
      speed: 0.12 / Math.max(angle, 0.3),
    };
  }, [travel]);

  useFrame(({ clock }) => {
    dot.current.position.copy(curve.getPoint((clock.elapsedTime * speed) % 1));
  });

  return (
    <group rotation={ROTATION}>
      <mesh>
        <tubeGeometry args={[curve, 128, 0.22, 8]} />
        <meshBasicMaterial color={COLOR} transparent opacity={0.85} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshBasicMaterial color={colors.flightDot} />
      </mesh>
    </group>
  );
};

export default Curve;
