import { useMemo } from "react";
import { greatCircleCurve, ROTATION } from "../../utils/globe";
import TRAVEL_TYPES from "../../utils/travelTypes";

const Path = ({ travel }) => {
  const curve = useMemo(
    () => greatCircleCurve(travel.start, travel.end, () => 0.4),
    [travel]
  );

  return (
    <mesh rotation={ROTATION}>
      <tubeGeometry args={[curve, 64, 0.3, 8]} />
      <meshBasicMaterial color={TRAVEL_TYPES[travel.type].color} />
    </mesh>
  );
};

export default Path;
