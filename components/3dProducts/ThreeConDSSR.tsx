import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";
import { useSpring, animated } from "@react-spring/three";

//Import and use the `Model` component in your Next.js page
const delay = 2500;

function Scene() {
  const modelUrl = "./models/DSSRfix.glb";

  const { DSSRRotation } = useSpring({
    from: { DSSRRotation: 0 },
    to: [
      { DSSRRotation: -Math.PI / 2, delay: delay },
      { DSSRRotation: -Math.PI, delay: delay },
      { DSSRRotation: -1.5 * Math.PI, delay: delay },
      { DSSRRotation: -2 * Math.PI, delay: delay },
    ],
    config: {
      mass: 5,
      tension: 170,
      friction: 46,
    },
    loop: true,
    immediate: true,
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <Environment preset="sunset" />
      <OrbitControls />
      <animated.group rotation-y={DSSRRotation}>
        <mesh>
          <Model url={modelUrl} />
        </mesh>
      </animated.group>
    </>
  );
}

export default function Home() {
  //file is in public folder
  return (
    <div className=" w-[500px] h-[300px] border">
      <Suspense>
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
