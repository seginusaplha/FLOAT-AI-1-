import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment,
  useTexture,
  MeshReflectorMaterial 
} from '@react-three/drei';
import * as THREE from 'three';

// Ocean Surface Component with animated waves
const OceanSurface = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Create the wave geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 50, 50);
    return geo;
  }, []);

  // Animate the ocean waves
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const vertices = meshRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        
        // Create wave patterns
        vertices[i + 2] = 
          Math.sin(x * 0.3 + time * 2) * 0.3 +
          Math.sin(y * 0.2 + time * 1.5) * 0.2 +
          Math.sin((x + y) * 0.1 + time) * 0.1;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <MeshReflectorMaterial
        ref={materialRef}
        color="#1e3a5f"
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={1}
        mirror={0.5}
        mixBlur={1}
        mixStrength={0.8}
        resolution={512}
        blur={[400, 100]}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        depthScale={1.2}
        depthToBlurRatioBias={0.2}
      />
    </mesh>
  );
};

// Floating ARGO simulation
const ARGOFloat = ({ position }) => {
  const floatRef = useRef();
  
  useFrame((state) => {
    if (floatRef.current) {
      const time = state.clock.elapsedTime;
      floatRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
      floatRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh ref={floatRef} position={position}>
      <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
      <meshStandardMaterial color="#06d6a0" emissive="#06d6a0" emissiveIntensity={0.2} />
    </mesh>
  );
};

// Ocean Scene Component
const OceanScene = () => {
  const argoPositions = useMemo(() => [
    [-3, 0, -2],
    [2, 0, -4],
    [-1, 0, 3],
    [4, 0, 1],
    [-2, 0, -1]
  ], []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize={2048}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#06d6a0" />

          {/* Ocean Surface */}
          <OceanSurface />
          
          {/* ARGO Floats */}
          {argoPositions.map((pos, index) => (
            <ARGOFloat key={index} position={pos} />
          ))}

          {/* Environment and Controls */}
          <Environment preset="night" />
          <fog attach="fog" args={['#0a192f', 10, 50]} />
          
          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OceanScene;