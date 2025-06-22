
import React, { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import * as THREE from 'three';


function Model({ url, ...props }: { url: string } & any) {
  const gltf = useGLTF(url) as { scene: THREE.Group };
  const { scene } = gltf;
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} {...props} />;
}

// Data structure for product information and model paths
// Added optional 'initialRotation' property as an array of radians [x, y, z]
const productsData = [
  {
    id: 'vband adpater',
    title: "Custom VBand Adapter",
    subtitle: "for M52 Custom Turbo kits",
    launchDate: "JUNE 2022",
    features: [
      "Works with any setup",
      "Works on E46 and E36 - 3 Series, E38 - 7 Series, E39 - 5 Series, BMWs.",
    ],
    modelPath: "./models/T3 to 2.5 VBand v2.glb", 
    scale: 0.08, // Adjust scale for individual model
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0] as [number, number, number], 
  },
  {
    id: 'turbo',
    title: "Turbo",
    subtitle: "Just a Turbo",
    launchDate: "JUNE 2022",
    features: [
      "Turbo",
      "Turbo",
    ],
    modelPath: "./models/turbo.glb",
    scale: 0.1, // Adjust scale for individual model
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0] as [number, number, number], 
  },
  {
    id: 'dssr',
    title: "Dual Shear Shifter Linkage",
    subtitle: "(E46 5 Spd Manual and 6 Spd Manual)",
    launchDate: "TBD",
    features: [
      "The DSSR redistributes the torsional forces from the pin/bushing interface to the complete face area on both sides of the selector joint. By taking advantage of the strength of steel in the DSSR and the body of the joint",
    ],
    modelPath: "./models/DSSRfix.glb",
    scale: 0.15, 
     // No initialRotation specified, will use calculated one to face center
  },
  {
    id: 'vent-gauge-pod',
    title: "Vent Gauge Pod",
    subtitle: "(39mm, 41mm Gauges)",
    launchDate: "TBD 2023",
    features: [
      "3D printed gauge pod for E46 BMWs. Fits 39mm and 41mm gauges.",
      "Works on E46 and 3 Series BMWs.",
    ],
    modelPath: "./models/GaugePod.glb",
     scale: 0.04, 
     initialRotation: [60, -Math.PI / 2 - Math.PI / 4, 0] as [number, number, number],
  },
];

// Calculate dynamic positions and rotations for the carousel
const carouselRadius = 3; // Radius of the circle the models are placed on
const totalModels = productsData.length;
const angleStep = (Math.PI * 2) / totalModels;

const positionedProducts = productsData.map((product, index) => {
    const angle = index * angleStep;
    const x = carouselRadius * Math.sin(angle);
    const z = carouselRadius * Math.cos(angle);

    const position: [number, number, number] = [x, 0, z];

    // Calculate rotation to make the model face the center [0,0,0]
    const calculatedRotationY = Math.atan2(-x, -z);
    const calculatedRotation: [number, number, number] = [0, calculatedRotationY, 0];

    // Use initialRotation from productsData if provided, otherwise use calculated rotation
    const finalRotation = product.initialRotation || calculatedRotation;

    return {
        ...product,
        position,
        // Store rotation as Euler angles for easier handling
        rotation: new THREE.Euler(...finalRotation),
    };
});


function TooltipContent({ product, visible }: { product: typeof productsData[0], visible: boolean }) {
    if (!visible) return null;
    return (
        <div className="tooltip-content" style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            pointerEvents: 'none',
            minWidth: '200px',
            maxWidth: '500px',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            transform: 'translate(-50%, -110%)',
            whiteSpace: 'normal',
            zIndex: 1000,
        }}>
            <strong>{product.title}</strong><br/>
            <em>{product.subtitle}</em><br/>
            Launch Date: {product.launchDate}<br/>
            <br/><strong>Features:</strong>
            <ul style={{ margin: '5px 0 0 15px', padding: 0, listStyleType: 'disc' }}>
              {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>
        </div>
    );
}



function ProductItem({ product, isHovered, onPointerOver, onPointerOut }: {
    product: typeof positionedProducts[0],
    isHovered: boolean,
    onPointerOver: (e: any, id: string) => void,
    onPointerOut: (e: any) => void
}) {
    // Use a local ref since we don't need to pass it up
    const meshRef = useRef<THREE.Group>(null);

    const { id, position, rotation, modelPath, scale } = product;

    return (
        <group
             ref={meshRef} // Use local ref
             position={position}
             rotation={rotation} // Use the pre-calculated/defined initial rotation
             onPointerOver={(e) => { e.stopPropagation(); onPointerOver(e, id); }} // Re-enabled hover handler
             onPointerOut={(e) => { e.stopPropagation(); onPointerOut(e); }} // Re-enabled hover handler
        >
            <Model url={modelPath} scale={scale} />
        </group>
    );
}


// Component to contain all 3D scene contents and logic, rendered inside Canvas
function SceneContents() {
    // Only need OrbitControls ref now
    const controlsRef = useRef<any>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for the inactivity timeout
    const lastInteractionTime = useRef<number>(Date.now()); // Track last interaction time
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null); // State for hover tooltip


    
     const autoRotateSpeed = 0.05; // Degrees per frame approx
     useFrame((state) => {
         const now = Date.now();
         const timeSinceLast = now - lastInteractionTime.current;

         const isOrbitDragging = controlsRef.current?.dragging || false;

         // Auto-rotate if OrbitControls are inactive AND 4 seconds passed
         if (!isOrbitDragging && timeSinceLast > 4000) {
             if (controlsRef.current) {
                 // Rotate the OrbitControls target position around the Y axis
                 const angle = autoRotateSpeed * Math.PI / 180; // Convert degrees to radians
                 const target = controlsRef.current.target;

                 const rotatedX = target.x * Math.cos(angle) - target.z * Math.sin(angle);
                 const rotatedZ = target.x * Math.sin(angle) + target.z * Math.cos(angle);

                 controlsRef.current.target.set(rotatedX, target.y, rotatedZ);
                 controlsRef.current.update(); // Must call update after changing target
             }
         }
     });


    // Update last interaction time on OrbitControls change (drag, zoom, rotate)
    const handleOrbitControlsChange = () => {
        lastInteractionTime.current = Date.now();
    };

    // Effect to set up and clean up listeners (only OrbitControls now)
    useEffect(() => {
        const orbitControls = controlsRef.current;

        if (orbitControls) {
            orbitControls.addEventListener('change', handleOrbitControlsChange);

            // Cleanup function: remove listener and clear timeout
            return () => {
                orbitControls.removeEventListener('change', handleOrbitControlsChange);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }
        // Only depends on controlsRef now
    }, [controlsRef]);


    // Handle hover events to show tooltip
    const handlePointerOver = (e: any, id: string) => {
        setHoveredItemId(id);
         // Update last interaction time on hover over a model
         lastInteractionTime.current = Date.now();
    };

    const handlePointerOut = (e: any) => {
        setHoveredItemId(null);
         // Update last interaction time on hover out
         lastInteractionTime.current = Date.now();
    };


    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 10]} intensity={0.6} />
            <directionalLight position={[-10, 10, -10]} intensity={0.4} />
            <directionalLight position={[0, -10, 0]} intensity={0.1} />

            {/* Render Product Items */}
            {positionedProducts.map((product) => ( // Use positionedProducts with initial rotations
                <ProductItem
                    key={product.id}
                    product={product}
                    isHovered={hoveredItemId === product.id} // isHovered prop for potential styling
                    onPointerOver={handlePointerOver} 
                    onPointerOut={handlePointerOut} 
                />
            ))}

            <OrbitControls
                ref={controlsRef} // Assign ref
                enablePan={false} // Disable panning
                enableZoom={true} // Allow zooming
                enableRotate={true} // Allow rotation of the camera
                target={[0, 0, 0]} // Orbit around the center
                maxPolarAngle={Math.PI / 1.8}
            />

             {hoveredItemId && (
                 <Html
                    // Find the hovered product to get its position for the tooltip
                    position={[
                        positionedProducts.find(p => p.id === hoveredItemId)?.position[0] || 0,
                        (positionedProducts.find(p => p.id === hoveredItemId)?.position[1] || 0) + 1, // Position above
                        positionedProducts.find(p => p.id === hoveredItemId)?.position[2] || 0,
                    ]}
                    center={true}
                    >
                     <TooltipContent product={positionedProducts.find(p => p.id === hoveredItemId)!} visible={true} />
                 </Html>
             )}

        </>
    );
}


// The main Canvas component that will be dynamically imported
const LVBTProductsCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, carouselRadius * 1.5, carouselRadius * 2.5], fov: 50 }}
            //shadows // Consider removing if performance is an issue
            gl={{
                //antialias: true, // Keep antialiasing for smoother look, but consider removing if lag persists
            }}
        >
            <color attach="background" args={['#242424']} />
            <Suspense fallback={
                 <Html center>
                     <p style={{ color: 'white' }}>Loading models...</p>
                 </Html>
            }>
                <SceneContents />
            </Suspense>
        </Canvas>
    );
};

export default LVBTProductsCanvas;