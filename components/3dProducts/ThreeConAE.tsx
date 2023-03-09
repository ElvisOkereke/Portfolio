import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useGLTF } from '@react-three/drei'


function Model() {
  const gltf = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
  return (<primitive object={gltf.scene} />)
}

export default function Home() {
  return (
    <div>
      <Suspense>
        <Canvas>
          <ambientLight />
          <Model />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  )
}
