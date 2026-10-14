import { useMemo } from "react";
import { BackSide, Color } from "three";
import { RADIUS } from "../../utils/globe";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Glow that fades out from the globe's rim, seen through the back faces.
const fragmentShader = /* glsl */ `
  uniform vec3 color;
  uniform float opacity;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(abs(vNormal.z), 1.6);
    gl_FragColor = vec4(color, intensity * opacity);
  }
`;

const Atmosphere = ({ colors }) => {
  const uniforms = useMemo(
    () => ({
      color: { value: new Color(colors.atmosphere) },
      opacity: { value: colors.atmosphereOpacity },
    }),
    [colors]
  );

  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <shaderMaterial
        key={colors.atmosphere}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

export default Atmosphere;
