"use client"

import { ServerRack } from "./server-rack"
import { NeonGridFloor } from "./neon-grid-floor"

// Server room scene — procedurally generated, no Blender assets needed.
// Renders two rows of server racks with neon blue/green LEDs, a
// glowing grid floor, and ambient neon lighting.
export const ServerRoom = () => {
  const rackPositions: Array<{
    pos: [number, number, number]
    rot: [number, number, number]
    color: string
    blink: number
  }> = [
    // Left wall row
    { pos: [-3.5, 1.0, -2], rot: [0, 0, 0], color: "#00f0ff", blink: 0 },
    { pos: [-3.5, 1.0, -0.5], rot: [0, 0, 0], color: "#00f0ff", blink: 0.5 },
    { pos: [-3.5, 1.0, 1.0], rot: [0, 0, 0], color: "#00ff88", blink: 1.0 },
    { pos: [-3.5, 1.0, 2.5], rot: [0, 0, 0], color: "#00f0ff", blink: 1.5 },

    // Right wall row
    { pos: [3.5, 1.0, -2], rot: [0, Math.PI, 0], color: "#00ff88", blink: 0.3 },
    { pos: [3.5, 1.0, -0.5], rot: [0, Math.PI, 0], color: "#00f0ff", blink: 0.8 },
    { pos: [3.5, 1.0, 1.0], rot: [0, Math.PI, 0], color: "#7B2FFF", blink: 1.3 },
    { pos: [3.5, 1.0, 2.5], rot: [0, Math.PI, 0], color: "#00f0ff", blink: 1.8 },

    // Center island row
    { pos: [0, 1.0, -3.5], rot: [0, Math.PI / 2, 0], color: "#00f0ff", blink: 0.2 },
    { pos: [1.5, 1.0, -3.5], rot: [0, Math.PI / 2, 0], color: "#00ff88", blink: 0.7 }
  ]

  return (
    <group>
      {/* Neon grid floor */}
      <NeonGridFloor size={30} position={[0, 0.01, 0]} />

      {/* Ambient neon lighting */}
      <ambientLight color="#050810" intensity={0.4} />
      <pointLight color="#00f0ff" intensity={1.5} position={[0, 3, 0]} distance={12} />
      <pointLight color="#00ff88" intensity={0.8} position={[-4, 2, 0]} distance={8} />
      <pointLight color="#7B2FFF" intensity={0.6} position={[4, 2, 0]} distance={8} />

      {/* Server racks */}
      {rackPositions.map((r, i) => (
        <ServerRack
          key={i}
          position={r.pos}
          rotation={r.rot}
          height={2.0}
          unitCount={22}
          glowColor={r.color}
          blinkOffset={r.blink}
        />
      ))}
    </group>
  )
}
