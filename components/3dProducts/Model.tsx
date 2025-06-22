import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { forwardRef, ForwardRefRenderFunction } from "react";

//a component to load and render the 3D model

type ModelProps = {
  url: string;
};

const Model: ForwardRefRenderFunction<any, ModelProps> = ({ url }, ref) => {
  const gltf = useGLTF(url) as { scene: THREE.Group };
    const { scene } = gltf;
  return <primitive ref={ref} object={scene.clone()} dispose={null} />;
};

export default forwardRef(Model);
