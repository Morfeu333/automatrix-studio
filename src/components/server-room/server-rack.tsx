"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

interface ServerRackProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  height?: number
  unitCount?: number
  glowColor?: string
  blinkOffset?: number
}

const RACK_W = 0.6
const RACK_D = 0.8
const UNIT_H = 0.044
const PANEL_INSET = 0.01

export const ServerRack = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  height = 2.0,
  unitCount = 20,
  glowColor = "#00f0ff",
  blinkOffset = 0
}: ServerRackProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const ledRefs = useRef<THREE.MeshStandardMaterial[]>([])

  const glowColorObj = useMemo(() => new THREE.Color(glowColor), [glowColor])
  const darkColor = useMemo(() => new THREE.Color("#0a0f1a"), [])
  const metalColor = useMemo(() => new THREE.Color("#1a1e2a"), [])

  const units = useMemo(() => {
    return Array.from({ length: unitCount }, (_, i) => ({
      id: i,
      isServer: Math.random() > 0.15,
      ledCount: Math.floor(Math.random() * 4) + 1,
      blinkRate: 0.5 + Math.random() * 3.0,
      ledColor: Math.random() > 0.3 ? glowColor : "#00ff88",
      phase: Math.random() * Math.PI * 2
    }))
  }, [unitCount, glowColor])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + blinkOffset
    ledRefs.current.forEach((mat, i) => {
      if (!mat) return
      const unit = units[Math.floor(i / 4)]
      if (!unit) return
      const blink = Math.sin(t * unit.blinkRate + unit.phase)
      const intensity = blink > 0.3 ? 2.5 : blink > -0.5 ? 0.3 : 0.0
      mat.emissiveIntensity = intensity
    })
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation as THREE.EulerTuple}
    >
      {/* Rack chassis */}
      <mesh castShadow>
        <boxGeometry args={[RACK_W, height, RACK_D]} />
        <meshStandardMaterial
          color={metalColor}
          metalness={0.8}
          roughness={0.4}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Rack frame edges — thin neon strips */}
      {[
        [-RACK_W / 2, 0, RACK_D / 2],
        [RACK_W / 2, 0, RACK_D / 2],
        [-RACK_W / 2, 0, -RACK_D / 2],
        [RACK_W / 2, 0, -RACK_D / 2]
      ].map(([ex, ey, ez], ei) => (
        <mesh key={ei} position={[ex, ey, ez]}>
          <boxGeometry args={[0.015, height, 0.015]} />
          <meshStandardMaterial
            color={glowColorObj}
            emissive={glowColorObj}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Server units */}
      {units.map((unit, ui) => {
        const yPos = -height / 2 + UNIT_H * ui + UNIT_H / 2
        if (!unit.isServer) {
          return (
            <mesh key={ui} position={[0, yPos, RACK_D / 2 - PANEL_INSET]}>
              <boxGeometry args={[RACK_W - 0.04, UNIT_H * 0.9, 0.02]} />
              <meshStandardMaterial color={darkColor} roughness={0.9} />
            </mesh>
          )
        }

        return (
          <group key={ui}>
            {/* Server faceplate */}
            <mesh position={[0, yPos, RACK_D / 2 - PANEL_INSET]}>
              <boxGeometry args={[RACK_W - 0.04, UNIT_H * 0.9, 0.018]} />
              <meshStandardMaterial
                color="#0d1525"
                metalness={0.6}
                roughness={0.5}
              />
            </mesh>

            {/* Status LEDs */}
            {Array.from({ length: unit.ledCount }, (_, li) => {
              const ledX = -RACK_W / 2 + 0.06 + li * 0.04
              const mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color(unit.ledColor),
                emissive: new THREE.Color(unit.ledColor),
                emissiveIntensity: 1.5
              })
              ledRefs.current[ui * 4 + li] = mat
              return (
                <mesh
                  key={li}
                  position={[ledX, yPos, RACK_D / 2 + 0.001]}
                  material={mat}
                >
                  <sphereGeometry args={[0.007, 6, 6]} />
                </mesh>
              )
            })}

            {/* Drive bay indicators */}
            <mesh position={[0.1, yPos, RACK_D / 2 - PANEL_INSET]}>
              <boxGeometry args={[0.12, UNIT_H * 0.5, 0.005]} />
              <meshStandardMaterial
                color={glowColorObj}
                emissive={glowColorObj}
                emissiveIntensity={0.15}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        )
      })}

      {/* Point light inside rack for ambient glow */}
      <pointLight
        color={glowColor}
        intensity={0.3}
        distance={1.5}
        position={[0, 0, 0]}
      />
    </group>
  )
}
