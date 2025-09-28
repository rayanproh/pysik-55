import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Stars, Environment, Torus, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

const SpacetimeGridMaterial = {
  uniforms: {
    time: { value: 0 },
    massPosition: { value: new THREE.Vector3(0, 0, 0) },
    massStrength: { value: 1.0 },
    color1: { value: new THREE.Color('#4fc3f7') },
    color2: { value: new THREE.Color('#9c27b0') }
  },
  vertexShader: `
    uniform float time;
    uniform vec3 massPosition;
    uniform float massStrength;
    varying float vDistortion;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float distance = length(pos.xz - massPosition.xz);
      float curvature = (massStrength * 2.0) / (distance * distance + 0.5);
      float wave = sin(time * 0.5 + distance * 0.5) * 0.1;
      pos.y = -curvature * 2.0 - wave * curvature;
      vDistortion = curvature;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying float vDistortion;
    varying vec2 vUv;

    void main() {
      float gridX = abs(fract(vUv.x * 20.0) - 0.5);
      float gridY = abs(fract(vUv.y * 20.0) - 0.5);
      float grid = 1.0 - step(0.05, min(gridX, gridY));
      
      vec3 color = mix(color1, color2, vDistortion * 0.5);
      float alpha = mix(0.3, 1.0, grid);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
};

const SpacetimeGridMesh = ({ massPosition, massStrength, animationSpeed }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 150, 150);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      ...SpacetimeGridMaterial,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      material.uniforms.time.value = state.clock.elapsedTime * animationSpeed;
      material.uniforms.massPosition.value.set(massPosition[0], massPosition[1], massPosition[2]);
      material.uniforms.massStrength.value = massStrength;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={shaderMaterial} position={[0, -2, 0]} />
  );
};

const OrbitPath = ({ radius, centralPosition, color = '#ffffff' }) => {
  const points = useMemo(() => {
    const segments = 64;
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = centralPosition[0] + radius * Math.cos(theta);
      const z = centralPosition[2] + radius * Math.sin(theta);
      points.push(new THREE.Vector3(x, centralPosition[1], z));
    }
    return points;
  }, [radius, centralPosition]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.3}
      dashed={true}
      dashScale={3}
      dashSize={0.1}
      gapSize={0.1}
    />
  );
};

const Planet = ({ position, size = 0.5, color = '#ff6b35', name = 'Planet', orbitRadius, orbitSpeed, centralMassPosition, isPlaying }) => {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state, delta) => {
    if (meshRef.current && isPlaying) {
      const time = state.clock.elapsedTime * orbitSpeed + initialAngle;
      const x = centralMassPosition[0] + orbitRadius * Math.cos(time);
      const z = centralMassPosition[2] + orbitRadius * Math.sin(time);
      const wobble = Math.sin(time * 5) * 0.05 * orbitRadius / 5;
      const newPosition = new THREE.Vector3(x, centralMassPosition[1] + wobble, z);
      meshRef.current.position.copy(newPosition);
      if (atmosphereRef.current) {
        atmosphereRef.current.position.copy(newPosition);
      }
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      <OrbitPath radius={orbitRadius} centralPosition={centralMassPosition} color={color} />
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.3}
          envMapIntensity={1}
        />
      </Sphere>
      <Sphere ref={atmosphereRef} args={[size * 1.2, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          envMapIntensity={0.5}
        />
      </Sphere>
      <Text
        position={[position[0], position[1] + size + 0.8, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
};

const BlackHole = ({ position, size = 1, name = 'Black Hole' }) => {
  const accretionDiskRef = useRef();

  useFrame((state, delta) => {
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Singularity */}
      <Sphere args={[size, 64, 64]}>
        <meshStandardMaterial color="black" roughness={0} metalness={0} />
      </Sphere>

      {/* Accretion Disk */}
      <mesh ref={accretionDiskRef} rotation-x={Math.PI / 2}>
        <Torus args={[size * 2.5, size * 0.8, 2, 100]}>
          <meshStandardMaterial color="#ff9800" emissive="#ff9800" emissiveIntensity={0.8} side={THREE.DoubleSide} />
        </Torus>
      </mesh>
      
      <Text position={[0, size + 2.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
        {name}
      </Text>
    </group>
  );
};

const FallingObject = ({ startPosition, targetPosition, isAnimating, onComplete, timeSpeed }) => {
  const meshRef = useRef();
  const [animationProgress, setAnimationProgress] = useState(0);

  useFrame((state, delta) => {
    if (isAnimating) {
      setAnimationProgress(prev => {
        const newProgress = prev + delta * 0.5 * timeSpeed; // Adjust speed
        if (newProgress >= 1) {
          onComplete();
          return 0; // Reset for next animation
        }
        return newProgress;
      });

      const progress = animationProgress;
      const newPos = [
        startPosition[0] + (targetPosition[0] - startPosition[0]) * progress,
        startPosition[1] + (targetPosition[1] - startPosition[1]) * (1 - Math.pow(1 - progress, 2)), // Ease-in effect
        startPosition[2] + (targetPosition[2] - startPosition[2]) * progress
      ];
      meshRef.current.position.set(...newPos);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.15, 16, 16]} position={startPosition}>
      <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={0.5} />
    </Sphere>
  );
};

const SpacetimeScene = ({
  showFallingDemo,
  massStrength,
  planetCount,
  isPlaying,
  timeSpeed,
  onFallingDemoComplete,
  centralMassPosition,
  planetColors,
  planetNamesAR,
  planetNamesFR,
  visualizationType
}) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(...centralMassPosition));
  }, [camera, centralMassPosition]);

  const handleFallingDemoComplete = useCallback(() => {
    onFallingDemoComplete && onFallingDemoComplete();
  }, [onFallingDemoComplete]);

  return (
    <>
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>

      {/* HDRI Lighting Setup */}
      <Environment
        preset="sunset"
        background={false}
        blur={0.8}
      />

      {/* Main Key Light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim Light */}
      <pointLight
        position={[-8, 4, -8]}
        intensity={0.8}
        color="#4fc3f7"
        distance={20}
        decay={2}
      />

      {/* Fill Light */}
      <pointLight
        position={[0, -5, 0]}
        intensity={0.3}
        color="#ffeb3b"
        distance={15}
        decay={2}
      />

      {/* Ambient Light for Base Illumination */}
      <ambientLight intensity={0.2} />

      {/* Enhanced Stars Background */}
      <Stars
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Spacetime Grid */}
      <SpacetimeGridMesh massPosition={centralMassPosition} massStrength={massStrength} animationSpeed={timeSpeed} />
      
      {/* Central Mass */}
      {visualizationType === 'blackhole' ? (
        <BlackHole position={centralMassPosition} name="ثقب أسود / Black Hole" />
      ) : (
        <Planet 
          position={centralMassPosition} 
          size={1.2} 
          color="#4caf50" 
          name="الأرض / Earth"
          isPlaying={isPlaying}
          orbitRadius={0} // Central mass doesn't orbit
          orbitSpeed={0}
          centralMassPosition={centralMassPosition}
        />
      )}
      
      {/* Orbiting Planets (only if not in blackhole view) */}
      {visualizationType !== 'blackhole' && Array.from({ length: planetCount }).map((_, i) => {
        const orbitRadius = 3 + i * 2;
        const orbitSpeed = 0.5 / (i + 1);
        return (
          <React.Fragment key={i}>
            <Line 
              points={[
                new THREE.Vector3(centralMassPosition[0], centralMassPosition[1], centralMassPosition[2]),
                new THREE.Vector3(centralMassPosition[0] + orbitRadius, centralMassPosition[1], centralMassPosition[2])
              ]}
              color={planetColors[i % planetColors.length]}
              lineWidth={1}
              dashed
              dashScale={10}
              dashSize={0.5}
              gapSize={0.5}
            />
            <Planet 
              position={[centralMassPosition[0] + orbitRadius, centralMassPosition[1], centralMassPosition[2]]} 
              size={0.3 + i * 0.1} 
              color={planetColors[i % planetColors.length]} 
              name={`${planetNamesAR[i]} / ${planetNamesFR[i]}`}
              orbitRadius={orbitRadius}
              orbitSpeed={orbitSpeed * timeSpeed}
              centralMassPosition={centralMassPosition}
              isPlaying={isPlaying}
            />
          </React.Fragment>
        );
      })}
      
      {/* Falling Object Demo */}
      {showFallingDemo && (
        <FallingObject
          startPosition={[5, 5, 5]}
          targetPosition={[centralMassPosition[0], centralMassPosition[1] + 0.5, centralMassPosition[2]]}
          isAnimating={showFallingDemo}
          onComplete={handleFallingDemoComplete}
          timeSpeed={timeSpeed}
        />
      )}
      
      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={25}
        minDistance={3}
        target={new THREE.Vector3(...centralMassPosition)}
      />
    </>
  );
};

export default function SpacetimeVisualization({
  showFallingDemo,
  massStrength: initialMassStrength = 2.0,
  planetCount = 2,
  isPlaying = true,
  timeSpeed = 1.0,
  onFallingDemoComplete,
  visualizationType = 'planet'
}) {
  const centralMassPosition = [0, -1.5, 0]; // Slightly below grid for visual effect
  const planetColors = useMemo(() => ["#ff9800", "#e91e63", "#2196f3", "#8bc34a", "#ffc107"], []);
  const planetNamesAR = useMemo(() => ["كوكب 1", "كوكب 2", "كوكب 3", "كوكب 4", "كوكب 5"], []);
  const planetNamesFR = useMemo(() => ["Planète 1", "Planète 2", "Planète 3", "Planète 4", "Planète 5"], []);

  // Increase mass strength for black hole for more dramatic effect
  const massStrength = visualizationType === 'blackhole' ? 8.0 : initialMassStrength;

  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-indigo-900 via-purple-900 to-black rounded-lg overflow-hidden relative">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <SpacetimeScene
          showFallingDemo={showFallingDemo}
          massStrength={massStrength}
          planetCount={planetCount}
          isPlaying={isPlaying}
          timeSpeed={timeSpeed}
          onFallingDemoComplete={onFallingDemoComplete}
          centralMassPosition={centralMassPosition}
          planetColors={planetColors}
          planetNamesAR={planetNamesAR}
          planetNamesFR={planetNamesFR}
          visualizationType={visualizationType}
        />
      </Canvas>
    </div>
  );
}