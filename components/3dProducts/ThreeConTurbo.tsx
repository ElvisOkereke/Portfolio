import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";

//Import and use the `Model` component in your Next.js page

function Scene() {
  const modelUrl = "./models/turbo.glb";

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight  />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50}/>
      <OrbitControls/>
      <mesh rotation={[0, 120, 0]} scale={1}>
        <Model url={modelUrl} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}

export default function Home() {
  //file is in public folder
  return (
    <div className="">
      <Suspense>
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
