"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uGridColor;
uniform vec3 uGridColor2;
uniform float uGridScale;
uniform float uFogDist;

varying vec2 vUv;
varying vec3 vWorldPos;

float gridLine(vec2 pos, float scale, float thickness) {
  vec2 grid = abs(fract(pos * scale) - 0.5);
  float d = min(grid.x, grid.y);
  return 1.0 - smoothstep(thickness - 0.002, thickness + 0.002, d);
}

void main() {
  vec2 pos = vWorldPos.xz;

  // Primary grid
  float g1 = gridLine(pos, 1.0, 0.025);
  // Secondary grid (larger cells)
  float g2 = gridLine(pos, 0.2, 0.018) * 0.6;

  // Animated pulse traveling outward from center
  float dist = length(pos);
  float pulse = sin(dist * 0.5 - uTime * 1.5) * 0.5 + 0.5;
  pulse = pow(pulse, 4.0) * 0.4;

  float grid = max(g1, g2) + pulse * g1;

  // Color mix — cyan near center, green further out
  float colorMix = clamp(dist / uFogDist, 0.0, 1.0);
  vec3 color = mix(uGridColor, uGridColor2, colorMix);

  // Fog — fade out toward edges
  float fog = 1.0 - smoothstep(uFogDist * 0.4, uFogDist, dist);

  float alpha = grid * fog * 0.7;
  gl_FragColor = vec4(color, alpha);
}
`

export const NeonGridFloor = ({
  size = 40,
  position = [0, 0, 0] as [number, number, number]
}) => {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridColor: { value: new THREE.Color("#00f0ff") },
      uGridColor2: { value: new THREE.Color("#00ff88") },
      uGridScale: { value: 1.0 },
      uFogDist: { value: size * 0.45 }
    }),
    [size]
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
