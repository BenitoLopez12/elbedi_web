import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Html,
  Line,
  MeshDistortMaterial,
  PerformanceMonitor,
  RoundedBox,
  Sparkles,
  Stars,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import * as THREE from "three";

const PLANETS = [
  {
    name: "Mercurio",
    role: "Mensajería",
    agentLabel: "Atención",
    radius: 1.52,
    eccentricity: 0.9,
    size: 0.17,
    speed: 0.22,
    phase: 0.2,
    inclination: 0.04,
    orbitTilt: 0.035,
    tilt: 0.035,
    color: "#b8c5d8",
    accent: "#d8efff",
    roughness: 0.92,
  },
  {
    name: "Venus",
    role: "Ventas",
    agentLabel: "Ventas",
    radius: 2.22,
    eccentricity: 0.92,
    size: 0.24,
    speed: 0.17,
    phase: 2.1,
    inclination: 0.08,
    orbitTilt: -0.055,
    tilt: 0.055,
    color: "#ffb77c",
    accent: "#ffe1a6",
    roughness: 0.76,
  },
  {
    name: "Tierra",
    role: "Experiencia",
    agentLabel: "Experiencia",
    radius: 2.95,
    eccentricity: 0.94,
    size: 0.27,
    speed: 0.135,
    phase: 4.5,
    inclination: 0.055,
    orbitTilt: 0.015,
    tilt: -0.025,
    color: "#52a9ff",
    accent: "#8fffd0",
    roughness: 0.64,
    moon: true,
  },
  {
    name: "Marte",
    role: "Operaciones",
    agentLabel: "Operaciones",
    radius: 3.7,
    eccentricity: 0.93,
    size: 0.21,
    speed: 0.108,
    phase: 1.15,
    inclination: 0.12,
    orbitTilt: 0.075,
    tilt: 0.07,
    color: "#ed6b63",
    accent: "#ffb59c",
    roughness: 0.88,
  },
  {
    name: "Júpiter",
    role: "Escala",
    agentLabel: "Crecimiento",
    radius: 4.48,
    eccentricity: 0.96,
    size: 0.46,
    speed: 0.074,
    phase: 3.45,
    inclination: 0.085,
    orbitTilt: -0.03,
    tilt: -0.035,
    color: "#e9a982",
    accent: "#ffd6b0",
    roughness: 0.7,
    bands: true,
  },
  {
    name: "Saturno",
    role: "Auditoría",
    agentLabel: "Auditoría",
    radius: 5.25,
    eccentricity: 0.97,
    size: 0.4,
    speed: 0.054,
    phase: 5.65,
    inclination: 0.15,
    orbitTilt: 0.095,
    tilt: 0.085,
    color: "#e9cc87",
    accent: "#fff0aa",
    roughness: 0.72,
    ring: "wide",
  },
  {
    name: "Urano",
    role: "Datos",
    agentLabel: "Datos",
    radius: 6.02,
    eccentricity: 0.98,
    size: 0.31,
    speed: 0.041,
    phase: 2.75,
    inclination: 0.11,
    orbitTilt: -0.07,
    tilt: -0.06,
    color: "#72dcea",
    accent: "#bdf8ff",
    roughness: 0.58,
    ring: "thin",
  },
  {
    name: "Neptuno",
    role: "Estrategia",
    agentLabel: "Estrategia",
    radius: 6.78,
    eccentricity: 0.99,
    size: 0.3,
    speed: 0.032,
    phase: 0.72,
    inclination: 0.13,
    orbitTilt: 0.055,
    tilt: 0.04,
    color: "#4b75ff",
    accent: "#c4b7ff",
    roughness: 0.54,
  },
];

function SceneReady({ onReady }) {
  const reported = useRef(false);

  useFrame(() => {
    if (reported.current) return;
    reported.current = true;
    requestAnimationFrame(() => onReady?.());
  });

  return null;
}

function AdaptiveQuality({ quality }) {
  const setDpr = useThree((state) => state.setDpr);
  const preferredDpr = quality === "high" ? 1.65 : quality === "balanced" ? 1.35 : 1;

  return (
    <PerformanceMonitor
      bounds={(refreshRate) =>
        refreshRate > 90 ? [50, 85] : [42, 58]
      }
      flipflops={3}
      onDecline={() => setDpr(1)}
      onIncline={() => setDpr(preferredDpr)}
    />
  );
}

function OrbitPath({ planet, lite }) {
  const points = useMemo(() => {
    const segments = lite ? 84 : 160;
    return Array.from({ length: segments + 1 }, (_, index) => {
      const angle = (index / segments) * Math.PI * 2;
      return [
        Math.cos(angle) * planet.radius,
        0,
        Math.sin(angle) * planet.radius * planet.eccentricity,
      ];
    });
  }, [lite, planet]);

  return (
    <Line
      points={points}
      color={planet.accent}
      lineWidth={lite ? 0.34 : 0.52}
      transparent
      opacity={lite ? 0.13 : 0.21}
      depthWrite={false}
    />
  );
}

function AgentGlyph({
  color,
  scale = 1,
  primary = false,
  surfaceOffset = 0,
}) {
  return (
    <Billboard>
      <group position-z={surfaceOffset} scale={scale}>
        <RoundedBox
          args={primary ? [0.82, 0.66, 0.2] : [0.64, 0.5, 0.15]}
          radius={primary ? 0.17 : 0.13}
          smoothness={2}>
          <meshPhysicalMaterial
            color={primary ? "#17142d" : "#14172d"}
            emissive={color}
            emissiveIntensity={primary ? 0.32 : 0.18}
            metalness={0.65}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.16}
          />
        </RoundedBox>
        <RoundedBox
          args={primary ? [0.58, 0.24, 0.08] : [0.45, 0.19, 0.06]}
          radius={0.08}
          smoothness={2}
          position={[0, 0.02, 0.13]}>
          <meshBasicMaterial color="#080a16" toneMapped={false} />
        </RoundedBox>
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[
              side * (primary ? 0.16 : 0.125),
              0.03,
              primary ? 0.18 : 0.13,
            ]}>
            <sphereGeometry args={[primary ? 0.052 : 0.038, 12, 12]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[0, primary ? 0.44 : 0.34, 0]}>
          <cylinderGeometry args={[0.018, 0.018, primary ? 0.24 : 0.18, 8]} />
          <meshStandardMaterial color="#cbd8ff" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, primary ? 0.57 : 0.44, 0]}>
          <sphereGeometry args={[primary ? 0.055 : 0.042, 12, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>
    </Billboard>
  );
}

function PlanetMoon({ parentSize, reducedMotion }) {
  const moonRef = useRef(null);

  useFrame(({ clock }) => {
    if (!moonRef.current || reducedMotion) return;
    const angle = clock.elapsedTime * 0.82;
    moonRef.current.position.set(
      Math.cos(angle) * parentSize * 1.8,
      Math.sin(angle * 1.3) * 0.035,
      Math.sin(angle) * parentSize * 1.8,
    );
  });

  return (
    <mesh ref={moonRef} position={[parentSize * 1.8, 0, 0]}>
      <sphereGeometry args={[parentSize * 0.18, 12, 12]} />
      <meshStandardMaterial color="#dfe9f5" roughness={0.95} />
    </mesh>
  );
}

function PlanetAgent({ planet, planetIndex, reducedMotion, lite }) {
  const groupRef = useRef(null);
  const labelAnchorRef = useRef(null);
  const planetRef = useRef(null);
  const pulseRef = useRef(null);
  const angleRef = useRef(planet.phase);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reducedMotion) {
      angleRef.current += delta * planet.speed;
      if (planetRef.current) {
        planetRef.current.rotation.y += delta * (0.28 + planet.speed);
        planetRef.current.rotation.x += delta * 0.035;
      }
    }

    const angle = angleRef.current;
    group.position.set(
      Math.cos(angle) * planet.radius,
      Math.sin(angle * 1.7 + planet.phase) * planet.inclination,
      Math.sin(angle) * planet.radius * planet.eccentricity,
    );

    if (labelAnchorRef.current) {
      const radialOffset = lite ? 0 : 0.27;
      labelAnchorRef.current.position.set(
        Math.cos(angle) * radialOffset,
        planet.size + (lite ? 0.25 : 0.32),
        Math.sin(angle) * radialOffset * planet.eccentricity,
      );
    }

    if (pulseRef.current) {
      const pulseAngle = angle + 0.42;
      pulseRef.current.position.set(
        Math.cos(pulseAngle) * planet.radius,
        Math.sin(pulseAngle * 1.7 + planet.phase) * planet.inclination,
        Math.sin(pulseAngle) * planet.radius * planet.eccentricity,
      );
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <group rotation={[planet.tilt, 0, planet.tilt * 0.62]}>
          <mesh ref={planetRef}>
            <sphereGeometry args={[planet.size, lite ? 24 : 40, lite ? 18 : 28]} />
            <meshPhysicalMaterial
              color={planet.color}
              emissive={planet.accent}
              emissiveIntensity={lite ? 0.08 : 0.16}
              metalness={planet.name === "Mercurio" ? 0.42 : 0.18}
              roughness={planet.roughness}
              clearcoat={lite ? 0.25 : 0.62}
              clearcoatRoughness={0.34}
            />
          </mesh>
          <mesh scale={1.055}>
            <sphereGeometry args={[planet.size, lite ? 16 : 24, lite ? 12 : 18]} />
            <meshBasicMaterial
              color={planet.accent}
              wireframe
              transparent
              opacity={lite ? 0.08 : 0.12}
              depthWrite={false}
            />
          </mesh>

          {planet.bands &&
            [-0.17, 0, 0.17].map((offset, index) => (
              <mesh
                key={offset}
                position-y={offset * planet.size}
                rotation-x={Math.PI / 2}>
                <torusGeometry
                  args={[
                    planet.size * (0.91 - index * 0.035),
                    planet.size * 0.025,
                    8,
                    lite ? 28 : 46,
                  ]}
                />
                <meshBasicMaterial
                  color={index === 1 ? "#fff0d4" : "#a9506f"}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            ))}

          {planet.ring && (
            <mesh rotation-x={-Math.PI / 2}>
              <ringGeometry
                args={[
                  planet.size * (planet.ring === "wide" ? 1.28 : 1.2),
                  planet.size * (planet.ring === "wide" ? 2.0 : 1.62),
                  lite ? 42 : 72,
                ]}
              />
              <meshBasicMaterial
                color={planet.accent}
                side={THREE.DoubleSide}
                transparent
                opacity={planet.ring === "wide" ? 0.48 : 0.3}
                depthWrite={false}
              />
            </mesh>
          )}

          {planet.moon && (
            <PlanetMoon
              parentSize={planet.size}
              reducedMotion={reducedMotion}
            />
          )}

          <AgentGlyph
            color={planet.accent}
            scale={Math.max(planet.size * 1.12, 0.25)}
            surfaceOffset={planet.size * 0.93}
          />
        </group>

        <group ref={labelAnchorRef}>
          <Html
            center
            zIndexRange={[18, 4]}
            className="cine-agent-label-wrap">
            <span
              className="cine-agent-label"
              style={{
                "--agent-accent": planet.accent,
                "--agent-delay": `${planetIndex * -3}s`,
              }}>
              <i />
              {planet.agentLabel}
            </span>
          </Html>
        </group>
      </group>

      {!lite && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={planet.accent} toneMapped={false} />
        </mesh>
      )}
    </>
  );
}

function OrchestratorCore({ reducedMotion, lite }) {
  const coreRef = useRef(null);
  const shellRef = useRef(null);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.16;
      coreRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.06;
    }
    if (shellRef.current) shellRef.current.rotation.y -= delta * 0.09;
  });

  return (
    <group>
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.7, lite ? 32 : 56, lite ? 24 : 40]} />
          <MeshDistortMaterial
            color="#ff6fb9"
            emissive="#ee4fa7"
            emissiveIntensity={0.82}
            roughness={0.36}
            metalness={0.12}
            distort={lite ? 0.08 : 0.15}
            speed={reducedMotion ? 0 : 1.15}
          />
        </mesh>
        <mesh ref={shellRef} scale={1.16}>
          <icosahedronGeometry args={[0.7, lite ? 1 : 2]} />
          <meshBasicMaterial
            color="#ffdca8"
            wireframe
            transparent
            opacity={lite ? 0.14 : 0.23}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.38}>
          <sphereGeometry args={[0.7, lite ? 20 : 36, lite ? 16 : 28]} />
          <meshBasicMaterial
            color="#ff9ed2"
            transparent
            opacity={lite ? 0.045 : 0.075}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      <AgentGlyph
        color="#f7edff"
        scale={0.54}
        primary
        surfaceOffset={0.72}
      />

      <Html
        center
        position={[0, 1.23, 0]}
        zIndexRange={[20, 5]}
        className="cine-agent-label-wrap">
        <span
          className="cine-agent-label cine-agent-label--primary"
          style={{ "--agent-accent": "#ffd7ec" }}>
          <i />
          Orquestador
        </span>
      </Html>
    </group>
  );
}

function CameraRig({ quality, reducedMotion }) {
  const camera = useThree((state) => state.camera);
  const target = useRef(new THREE.Vector3(0, -0.08, 0));

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    const targetY = quality === "lite" ? 10.8 : quality === "balanced" ? 11.8 : 12.5;
    const targetZ = quality === "lite" ? 17.6 : quality === "balanced" ? 15.2 : 13.6;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(t * 0.16) * 0.3,
      2.4,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY + Math.cos(t * 0.13) * 0.16,
      2.4,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ + Math.sin(t * 0.1) * 0.18,
      2.4,
      delta,
    );
    camera.lookAt(target.current);
  });

  return null;
}

function SolarSystem({ quality, reducedMotion }) {
  const rigRef = useRef(null);
  const lite = quality === "lite";

  useFrame(({ clock }, delta) => {
    if (!rigRef.current || reducedMotion) return;
    rigRef.current.rotation.y = THREE.MathUtils.damp(
      rigRef.current.rotation.y,
      Math.sin(clock.elapsedTime * 0.12) * 0.08,
      1.8,
      delta,
    );
    rigRef.current.rotation.z = THREE.MathUtils.damp(
      rigRef.current.rotation.z,
      0.055 + Math.cos(clock.elapsedTime * 0.1) * 0.018,
      1.8,
      delta,
    );
  });

  return (
    <>
      <ambientLight intensity={0.52} color="#a5baff" />
      <hemisphereLight args={["#a8dcff", "#2e143f", 0.7]} />
      <directionalLight position={[4, 6, 7]} intensity={2.1} color="#e3f5ff" />
      <directionalLight position={[-5, -1, 4]} intensity={1.2} color="#ff99d0" />
      <pointLight
        position={[0, 0, 0]}
        intensity={lite ? 12 : 17}
        distance={13}
        decay={2}
        color="#ffc4c7"
      />

      <Stars
        radius={22}
        depth={14}
        count={lite ? 260 : quality === "high" ? 920 : 560}
        factor={lite ? 1.4 : 1.8}
        saturation={0.55}
        fade
        speed={reducedMotion ? 0 : 0.18}
      />

      <group
        ref={rigRef}
        rotation={[-0.055, 0, 0.045]}
        scale={lite ? 0.72 : quality === "balanced" ? 1.08 : 1.18}>
        {PLANETS.map((planet, planetIndex) => (
          <group key={planet.name} rotation-z={planet.orbitTilt}>
            <OrbitPath planet={planet} lite={lite} />
            <PlanetAgent
              planet={planet}
              planetIndex={planetIndex}
              reducedMotion={reducedMotion}
              lite={lite}
            />
          </group>
        ))}
        <OrchestratorCore reducedMotion={reducedMotion} lite={lite} />
      <Sparkles
          count={lite ? 24 : 58}
          scale={[3.4, 2, 3.4]}
          size={lite ? 1.2 : 1.7}
          speed={reducedMotion ? 0 : 0.24}
          opacity={0.55}
          color="#ffd8ef"
          noise={0.7}
        />
      </group>

      <CameraRig quality={quality} reducedMotion={reducedMotion} />
    </>
  );
}

export default function AgenticSolarScene({
  quality = "high",
  reducedMotion = false,
  active = true,
  onReady,
}) {
  const dpr = quality === "high" ? 1.65 : quality === "balanced" ? 1.35 : 1;

  return (
    <Canvas
      className="cine-solar__canvas"
      camera={{
        position: [0, 12.5, 13.6],
        fov: 42,
        near: 0.1,
        far: 80,
      }}
      dpr={dpr}
      frameloop={reducedMotion || !active ? "demand" : "always"}
      gl={{
        alpha: true,
        antialias: quality !== "lite",
        powerPreference: "high-performance",
        stencil: false,
      }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = 1.08;
      }}>
      <SceneReady onReady={onReady} />
      <AdaptiveQuality quality={quality} />
      <SolarSystem quality={quality} reducedMotion={reducedMotion} />

      <EffectComposer multisampling={quality === "high" ? 2 : 0}>
        <Bloom
          intensity={quality === "lite" ? 0.42 : 0.58}
          luminanceThreshold={0.78}
          luminanceSmoothing={0.26}
          mipmapBlur={quality !== "lite"}
          radius={quality === "lite" ? 0.38 : 0.56}
        />
      </EffectComposer>
    </Canvas>
  );
}
