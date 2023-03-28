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
  const modelUrl = "./models/GaugePod.glb";

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh>
        <Model url={modelUrl} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}

export default function Home() {
  //file is in public folder
  return (
    <div className=" w-[500px] h-[300px]">
      <Suspense>
        <Canvas>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
