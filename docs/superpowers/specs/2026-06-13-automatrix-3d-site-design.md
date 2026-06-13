# Automatrix Studio — 3D Interactive Website Design

**Date:** 2026-06-13  
**Base:** Fork of `basementstudio/website-2k25` (Next.js 15 + React Three Fiber)  
**Approach:** Hybrid — existing R3F architecture + cyberpunk skin + procedural server room elements

---

## Concept

A dark, immersive 3D **server room / data center** environment. The user scrolls through the scene as the camera glides between areas, each representing a section of the site (Home, Services, Work, Team, Contact). AI agent characters roam the floor. Neon blue/green lighting. Holographic screens display data flows and live metrics.

**Palette:**
- Background: `#050810` (near-black deep blue)
- Neon primary: `#00f0ff` (electric cyan)
- Neon secondary: `#00ff88` (matrix green)
- Accent: `#7B2FFF` (purple/violet)
- Text: `#e8f4f8` (cold white)

---

## Architecture

### Inherited (from basement.studio, unchanged)
- Next.js 15 App Router
- React Three Fiber Canvas with demand frameloop
- Camera controller (scroll → camera animation path)
- Inspectables system (hover/click 3D objects → info panels)
- Instanced skinned mesh characters
- Physics via Rapier (optional)
- Sanity CMS for content
- Zustand for state
- Custom GLSL post-processing pipeline

### New (Automatrix-specific)
- **Neon bloom shader**: Increase bloom threshold for neon materials, shift color grading to blue/cyan
- **Holographic screen shader**: Scanlines + scrolling data text on plane meshes
- **Server rack geometry**: Procedural BoxGeometry racks generated in Three.js (no Blender needed)
- **Data stream particles**: Flowing particle system simulating network traffic
- **Grid floor shader**: Neon grid on infinite dark floor (GLSL)
- **Cyberpunk post-processing**: Heavy vignette, chromatic aberration, CRT scanlines

---

## Scene Layout (Camera Path)

| Scene Anchor | Content | Interactive Element |
|---|---|---|
| 0. Entry / Hub | Logo reveal, hero text, ambient server hum | Holographic welcome panel |
| 1. Services / Stack | What Automatrix builds | Clickable tech stack displays |
| 2. Work / Clients | Past projects in holographic frames | Portfolio inspectables |
| 3. Team / Agents | AI agent characters seated at terminals | Character hover: team member card |
| 4. Contact | Terminal input, send message | Interactive terminal |

---

## 3D Assets Plan

### Phase 1 — Placeholder (start now, no Blender)
- Keep basement.studio GLB room as structural scaffold
- Override materials with cyberpunk shaders
- Add procedural server racks via Three.js BoxGeometry
- Character textures swapped to dark/mechanical look

### Phase 2 — Custom models (later, with Blender or AI)
- New server room GLB scene baked in Blender with neon lighting
- Robot/AI agent character GLB (source: Mixamo base + custom clothing)
- Holographic display stands
- Server rack GLB from Sketchfab (CC0 license)

### Free model sources
- **Sketchfab** — search "server rack CC0", "data center", "robot character"
- **Mixamo** — free animated characters (humanoid base, swap textures)
- **Meshy.ai** — AI text-to-3D generation
- **Tripo3D** — AI 3D generation alternative

---

## Key Implementation Files

| File | Change |
|---|---|
| `src/shaders/material-postprocessing/fragment.glsl` | Add chromatic aberration, shift color grading blue/cyan |
| `src/styles/globals.css` | Update CSS variables to cyberpunk palette |
| `src/components/map/index.tsx` | Add server rack procedural geometry |
| `src/components/characters/characters-config.ts` | Remap character textures/animations |
| `src/components/navigation-handler/` | Rename nav: Home→Hub, Services→Stack, etc |
| `src/components/postprocessing/` | Tune bloom for neon glow |
| `tailwind.config.ts` | Update colors to cyberpunk palette |

---

## Navigation Rename

| Original | Automatrix |
|---|---|
| Home | Hub |
| Services | Stack |
| Showcase | Clients |
| People | Agents |
| Blog | Logs |
| Lab | Sandbox |
| Contact Us | Connect |

---

## What User Needs to Provide

| Item | When | How |
|---|---|---|
| Automatrix logo (SVG) | Now | Replace `basement.` in nav |
| Brand colors confirmation | Now | Confirm cyan/green palette above |
| Content for each section | Before launch | Services list, team bios, portfolio projects |
| Custom 3D scene (optional) | Later | Blender artist OR Meshy.ai generation |
| Robot/AI agent character | Later | Mixamo free + Blender skin OR Meshy.ai |
| Sanity credentials | Before launch | To use CMS for content |
| Vercel project | Before launch | For deployment |

---

## Implementation Order

1. **Shader customization** — neon bloom, color grading shift, scanlines (pure code, no assets)
2. **CSS/Tailwind palette** — dark cyberpunk colors throughout UI
3. **Navigation rename** — Hub, Stack, Agents, etc.
4. **Procedural server racks** — Three.js geometry in scene
5. **Holographic screen shader** — data text scrolling on plane meshes
6. **Character texture override** — dark/mechanical look on existing characters
7. **Content replacement** — Automatrix services, portfolio, team
8. **Custom GLB swap** — when 3D models are ready

---

## Estimated Timeline

| Phase | Time | Requires |
|---|---|---|
| Shaders + palette + nav | 1-2 days | Just code |
| Procedural racks + holograms | 2-3 days | Just code |
| Content replacement | 1 day | Your content |
| Custom models | 1-2 weeks | Blender artist OR AI tools |
| Full polish + deploy | 1 day | Vercel + Sanity setup |
