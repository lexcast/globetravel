import { RADIUS, ROTATION } from "../../utils/globe";

const Earth = ({ colors }) => (
  <mesh rotation={ROTATION}>
    <sphereGeometry args={[RADIUS - 0.2, 64, 64]} />
    <meshBasicMaterial color={colors.earth} />
  </mesh>
);

export default Earth;
