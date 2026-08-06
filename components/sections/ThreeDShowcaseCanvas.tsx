"use client";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { threeDProducts } from "@/lib/data/threeDProducts";

function Model({ modelPath, scale }: { modelPath: string; scale: number }) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} scale={scale} />;
}

const RADIUS = 3;
const positioned = threeDProducts.map((product, index) => {
  const angle = (index / threeDProducts.length) * Math.PI * 2;
  const x = RADIUS * Math.sin(angle);
  const z = RADIUS * Math.cos(angle);
  const rotation = product.initialRotation ?? ([0, Math.atan2(-x, -z), 0] as [number, number, number]);
  return { ...product, position: [x, 0, z] as [number, number, number], rotation };
});

function Scene() {
  const controlsRef = useRef<any>(null);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useFrame(() => {
    if (prefersReducedMotion) return;
    if (controlsRef.current && !controlsRef.current.dragging) {
      const angle = 0.001;
      const target = controlsRef.current.target;
      const rotatedX = target.x * Math.cos(angle) - target.z * Math.sin(angle);
      const rotatedZ = target.x * Math.sin(angle) + target.z * Math.cos(angle);
      target.set(rotatedX, target.y, rotatedZ);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={0.6} />
      <directionalLight position={[-10, 10, -10]} intensity={0.4} />
      {positioned.map((product) => (
        <group key={product.id} position={product.position} rotation={product.rotation}>
          <Model modelPath={product.modelPath} scale={product.scale} />
        </group>
      ))}
      <OrbitControls ref={controlsRef} enablePan={false} maxPolarAngle={Math.PI / 1.8} />
    </>
  );
}

export default function ThreeDShowcaseCanvas() {
  return (
    <Canvas camera={{ position: [0, RADIUS * 1.5, RADIUS * 2.5], fov: 50 }}>
      <color attach="background" args={["#0a0a0a"]} />
      <Suspense
        fallback={
          <Html center className="font-mono text-sm text-foreground/50">
            Loading models…
          </Html>
        }
      >
        <Scene />
      </Suspense>
    </Canvas>
  );
}
