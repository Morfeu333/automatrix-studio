precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;
uniform float uScanSpeed;
uniform float uGlitchIntensity;
uniform sampler2D uTexture;
uniform float uHasTexture;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Scrolling horizontal scanline
float scanLine(vec2 uv, float speed, float lineCount) {
  float line = fract(uv.y * lineCount - uTime * speed);
  return smoothstep(0.0, 0.05, line) * smoothstep(0.5, 0.45, line);
}

// Data stream — vertical columns of random bits scrolling down
float dataStream(vec2 uv, float speed, float cols) {
  float col = floor(uv.x * cols);
  float offset = random(vec2(col, 0.0)) * 10.0;
  float stream = fract(uv.y + uTime * speed * (0.5 + random(vec2(col, 1.0))));
  float bit = step(0.5, random(vec2(col, floor(stream * 20.0))));
  float fade = (1.0 - stream) * (1.0 - stream);
  return bit * fade;
}

// Glitch displacement
vec2 glitch(vec2 uv, float intensity) {
  float t = floor(uTime * 10.0) * 0.1;
  float band = step(0.95, random(vec2(floor(uv.y * 20.0), t)));
  float displacement = (random(vec2(t, floor(uv.y * 20.0))) - 0.5) * intensity * band;
  return uv + vec2(displacement, 0.0);
}

void main() {
  vec2 uv = vUv;

  // Subtle glitch effect
  uv = glitch(uv, uGlitchIntensity);
  uv = clamp(uv, 0.0, 1.0);

  vec3 color = uColor;

  // Optional texture overlay (for displaying content on the screen)
  if (uHasTexture > 0.5) {
    vec3 tex = texture2D(uTexture, uv).rgb;
    color = mix(color * 0.3, tex, 0.7);
    color = mix(color, color * uColor * 2.0, 0.3);
  }

  // Scrolling scanline overlay — bright moving band
  float scan = scanLine(uv, uScanSpeed, 60.0);
  color += uColor * scan * 0.6;

  // Data stream overlay — falling binary/hex look
  float stream = dataStream(uv, uScanSpeed * 0.3, 20.0);
  color += uColor * stream * 0.4;

  // Horizontal CRT lines
  float crtLines = mod(floor(uv.y * 200.0), 2.0);
  color *= mix(0.85, 1.0, crtLines);

  // Fresnel rim glow — edges brighter (holographic edge effect)
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
  fresnel = pow(fresnel, 2.0);
  color += uColor * fresnel * 0.8;

  // Flicker
  float flicker = 0.95 + 0.05 * sin(uTime * 17.3 + random(vec2(uTime * 0.1, 0.0)) * 6.28);
  color *= flicker;

  // Alpha: transparent in center, more opaque at edges + scanlines
  float alpha = uOpacity * (0.6 + 0.4 * fresnel + 0.2 * scan);
  alpha *= mix(0.85, 1.0, crtLines);

  gl_FragColor = vec4(color, alpha);
}
