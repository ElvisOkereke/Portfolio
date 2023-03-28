import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { forwardRef, ForwardRefRenderFunction } from "react";

//a component to load and render the 3D model

type ModelProps = {
  url: string;
};

const Model: ForwardRefRenderFunction<any, ModelProps> = ({ url }, ref) => {
  const { scene } = useGLTF(url) as GLTF;

  return <primitive ref={ref} object={scene.clone()} dispose={null} />;
};

export default forwardRef(Model);
