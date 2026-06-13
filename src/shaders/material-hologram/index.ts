import { AdditiveBlending, Color, ShaderMaterial, Texture } from "three"

import fragmentShader from "./fragment.glsl"
import vertexShader from "./vertex.glsl"

interface HologramMaterialOptions {
  color?: string
  opacity?: number
  scanSpeed?: number
  glitchIntensity?: number
  texture?: Texture | null
}

export const createHologramMaterial = ({
  color = "#00f0ff",
  opacity = 0.85,
  scanSpeed = 0.5,
  glitchIntensity = 0.02,
  texture = null
}: HologramMaterialOptions = {}) =>
  new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColor: { value: new Color(color) },
      uScanSpeed: { value: scanSpeed },
      uGlitchIntensity: { value: glitchIntensity },
      uTexture: { value: texture },
      uHasTexture: { value: texture ? 1.0 : 0.0 }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: 2
  })
