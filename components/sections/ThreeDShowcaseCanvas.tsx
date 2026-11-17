"use client";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { addEffect, Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  CameraControls,
  CameraControlsImpl,
  ContactShadows,
  Environment,
  Grid,
  Html,
  Lightformer,
  PerformanceMonitor,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { threeDProducts, type ThreeDProduct } from "@/lib/data/threeDProducts";

/** Every model is scaled so its largest side is this many world units. */
const MODEL_SIZE = 1.6;
const RING_RADIUS = 3.3;
const OVERVIEW = { position: [0, 4.2, 9.8] as const, target: [0, 0.6, 0] as const };
const UP = new THREE.Vector3(0, 1, 0);
const IDENTITY = new THREE.Quaternion();
/** Radians of part rotation per pixel dragged. */
const DRAG_SPEED = 0.012;
/** The Draco decoder is served from this site (public/draco), not fetched from gstatic.com. */
const DRACO_PATH = "/draco/";

/** A one-off rotation request for a part, from the parts panel. `token` makes repeats distinct. */
export type PartCommand = { id: string; kind: "yaw" | "pitch" | "reset"; token: number };

export type ViewerSettings = {
  selectedId: string | null;
  autoRotate: boolean;
  wireframe: boolean;
  resetToken: number;
  partCommand: PartCommand | null;
};

type CanvasProps = ViewerSettings & {
  onSelect: (id: string | null) => void;
  onStats: (id: string, triangles: number) => void;
  onUserInteract: () => void;
};

const layout = threeDProducts.map((product, i) => {
  const angle = (i / threeDProducts.length) * Math.PI * 2;
  return { product, position: new THREE.Vector3(Math.sin(angle) * RING_RADIUS, 0, Math.cos(angle) * RING_RADIUS) };
});

type ModelProps = {
  product: ThreeDProduct;
  position: THREE.Vector3;
  hovered: boolean;
  /** Hidden while any part is being dragged, so it doesn't jitter over the model. */
  showTooltip: boolean;
  dimmed: boolean;
  wireframe: boolean;
  command: PartCommand | null;
  resetToken: number;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onStats: (id: string, triangles: number) => void;
  onDragChange: (dragging: boolean, id: string) => void;
  registerGroup: (id: string, group: THREE.Group | null) => void;
};

function Model({
  product,
  position,
  hovered,
  showTooltip,
  dimmed,
  wireframe,
  command,
  resetToken,
  onHover,
  onSelect,
  onStats,
  onDragChange,
  registerGroup,
}: ModelProps) {
  const { scene } = useGLTF(product.modelPath, DRACO_PATH);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: product.finish.color,
        metalness: product.finish.metalness,
        roughness: product.finish.roughness,
        envMapIntensity: 1.5,
      }),
    [product.finish]
  );

  // Clone, apply the display finish, then normalise size and sit the model on the floor.
  const { object, height, radius, triangles } = useMemo(() => {
    const root = scene.clone(true);
    let tris = 0;
    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = material;
      const geo = mesh.geometry;
      tris += (geo.index ? geo.index.count : geo.attributes.position.count) / 3;
    });
    if (product.initialRotation) root.rotation.set(...product.initialRotation);
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root, true); // exact vertices, so parts sit on the floor
    const size = box.getSize(new THREE.Vector3());
    const scale = MODEL_SIZE / Math.max(size.x, size.y, size.z);
    const wrapper = new THREE.Group();
    const center = box.getCenter(new THREE.Vector3());
    root.position.sub(new THREE.Vector3(center.x, box.min.y, center.z));
    wrapper.add(root);
    wrapper.scale.setScalar(scale);
    return {
      object: wrapper,
      height: size.y * scale,
      // Rotation pivots on the model's centre. Lifting the centre this high (half the box
      // diagonal) means no orientation can push the part through the floor.
      radius: (size.length() / 2) * scale,
      triangles: Math.round(tris),
    };
  }, [scene, material, product.initialRotation]);

  useEffect(() => onStats(product.id, triangles), [onStats, product.id, triangles]);

  useEffect(() => {
    material.wireframe = wireframe;
    material.transparent = dimmed;
    material.opacity = dimmed ? 0.18 : 1;
    material.emissive.set(hovered ? "#f5a623" : "#000000");
    material.emissiveIntensity = hovered ? 0.18 : 0;
    material.needsUpdate = true;
    invalidate(); // the canvas only renders on demand
  }, [material, wireframe, dimmed, hovered, invalidate]);

  // --- Rotating the part itself -------------------------------------------------
  const lift = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Quaternion());
  const dragging = useRef(false);
  const [rotated, setRotated] = useState(false);

  const rotateBy = (axis: THREE.Vector3, angle: number) => {
    target.current.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, angle)).normalize();
    setRotated(target.current.angleTo(IDENTITY) > 0.01);
    invalidate();
  };
  const cameraRight = () => new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const resetRotation = () => {
    target.current.identity();
    setRotated(false);
    invalidate();
  };

  // Buttons in the parts panel: quarter turns and reset, animated by useFrame below.
  useEffect(() => {
    if (!command || command.id !== product.id) return;
    if (command.kind === "yaw") rotateBy(UP, Math.PI / 2);
    else if (command.kind === "pitch") rotateBy(cameraRight(), Math.PI / 2);
    else resetRotation();
    // Only react to new commands, not to re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command]);

  // "Reset view" also puts every part back upright.
  useEffect(() => {
    target.current.identity();
    setRotated(false);
    invalidate();
  }, [resetToken, invalidate]);

  useFrame((_, delta) => {
    if (!spin.current || !lift.current) return;
    spin.current.quaternion.slerp(target.current, 1 - Math.exp(-(dragging.current ? 30 : 9) * delta));
    // Rest on the floor when upright; float just clear of it while turned.
    const restY = rotated ? radius : height / 2;
    lift.current.position.y += (restY - lift.current.position.y) * (1 - Math.exp(-8 * delta));
    // On-demand rendering: keep asking for frames until the part has settled.
    const turning = spin.current.quaternion.angleTo(target.current) > 1e-4;
    const lifting = Math.abs(restY - lift.current.position.y) > 1e-4;
    if (turning || lifting) invalidate();
  });

  const startDrag = (e: ThreeEvent<PointerEvent>) => {
    if (e.button !== 0) return; // right-drag still pans the camera
    e.stopPropagation();
    dragging.current = true;
    onDragChange(true, product.id);
    let last = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - last.x;
      const dy = ev.clientY - last.y;
      last = { x: ev.clientX, y: ev.clientY };
      if (dx) rotateBy(UP, dx * DRAG_SPEED);
      if (dy) rotateBy(cameraRight(), dy * DRAG_SPEED);
    };
    const end = () => {
      dragging.current = false;
      onDragChange(false, product.id);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  return (
    <group
      ref={(g) => registerGroup(product.id, g)}
      position={position}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(product.id);
      }}
      onPointerOut={() => onHover(null)}
      onPointerDown={startDrag}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (e.delta > 6) return; // that was a drag, not a click
        onSelect(product.id);
      }}
    >
      <group ref={lift} position={[0, height / 2, 0]}>
        <group ref={spin}>
          <group position={[0, -height / 2, 0]}>
            <primitive object={object} />
          </group>
        </group>
      </group>
      {hovered && showTooltip && (
        <Html
          position={[0, (rotated ? radius * 2 : height) + 0.35, 0]}
          center
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="w-60 rounded-lg border border-accent/40 bg-[#111]/95 p-3 text-left shadow-xl backdrop-blur">
            <p className="text-sm font-semibold text-foreground">{product.title}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">{product.subtitle}</p>
            <p className="mt-2 text-xs leading-snug text-foreground/70">{product.description}</p>
            <p className="mt-2 font-mono text-[10px] text-foreground/40">
              {(triangles / 1000).toFixed(1)}k triangles · drag to rotate · click to inspect
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({
  selectedId,
  autoRotate,
  wireframe,
  resetToken,
  partCommand,
  onSelect,
  onStats,
  onUserInteract,
}: CanvasProps) {
  const controls = useRef<CameraControlsImpl>(null);
  const groups = useRef(new Map<string, THREE.Group>());
  const invalidate = useThree((state) => state.invalidate);
  const clock = useThree((state) => state.clock);
  // On-demand rendering leaves gaps between frames, and the clock keeps running through them, so
  // the first frame after an idle gap would get the whole gap as its delta and every eased
  // animation (camera fly-to, part turns, turntable) would jump to its end. Treat that first frame
  // as one nominal 60 fps frame instead.
  useEffect(() => {
    let last = -Infinity;
    return addEffect((t) => {
      if (t - last > 100) clock.oldTime = performance.now() - 1000 / 60;
      last = t;
    });
  }, [clock]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingPart, setDraggingPart] = useState(false);
  // Contact shadows re-render the whole scene, so they stay live only while a part is moving
  // (dragging, or settling for a moment after a drag, quarter turn or reset) and are otherwise
  // baked once (frames={1} re-bakes on each re-render), instead of every frame.
  const [settling, setSettling] = useState(false);
  const settleTimer = useRef<number | undefined>(undefined);
  const settle = () => {
    setSettling(true);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      setSettling(false);
      invalidate(); // one more frame so the final shadow bake happens
    }, 900);
  };
  const firstCommand = useRef(true);
  useEffect(() => {
    if (firstCommand.current) {
      firstCommand.current = false;
      return;
    }
    settle();
  }, [partCommand, resetToken]);
  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  useEffect(() => {
    document.body.style.cursor = draggingPart ? "grabbing" : hoveredId ? "grab" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hoveredId, draggingPart]);

  // Left-drag over a part rotates the part, so the camera must not orbit at the same time.
  // Wheel zoom and right-drag pan stay on.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const onPart = hoveredId !== null || draggingPart;
    c.mouseButtons.left = onPart ? CameraControlsImpl.ACTION.NONE : CameraControlsImpl.ACTION.ROTATE;
    c.touches.one = onPart ? CameraControlsImpl.ACTION.NONE : CameraControlsImpl.ACTION.TOUCH_ROTATE;
  }, [hoveredId, draggingPart]);

  const onDragChange = (dragging: boolean, id: string) => {
    if (!dragging) {
      refitSoon(id);
      settle();
    }
    if (dragging) {
      controls.current?.cancel(); // touch screens have no hover, so stop an orbit that just began
      onUserInteract();
    }
    setDraggingPart(dragging);
  };

  // Start from the overview without animating.
  useLayoutEffect(() => {
    controls.current?.setLookAt(...OVERVIEW.position, ...OVERVIEW.target, false);
  }, []);

  // Frame a part by its bounding sphere, so the framing still fits after the part is turned.
  const frameSelected = (id: string | null) => {
    const c = controls.current;
    if (!c) return;
    const group = id ? groups.current.get(id) : null;
    if (group) {
      const sphere = new THREE.Box3().setFromObject(group).getBoundingSphere(new THREE.Sphere());
      sphere.radius *= 1.1;
      void c.fitToSphere(sphere, true);
    } else {
      void c.setLookAt(...OVERVIEW.position, ...OVERVIEW.target, true);
    }
  };

  // Fly to the selected part, or back to the overview.
  useEffect(() => {
    frameSelected(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, resetToken]);

  // After the selected part is turned (buttons or drag), re-frame once it has settled.
  const refitTimer = useRef<number | undefined>(undefined);
  const refitSoon = (id: string) => {
    if (id !== selectedId) return;
    window.clearTimeout(refitTimer.current);
    refitTimer.current = window.setTimeout(() => frameSelected(id), 650);
  };
  useEffect(() => {
    if (partCommand) refitSoon(partCommand.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partCommand]);
  useEffect(() => () => window.clearTimeout(refitTimer.current), []);

  // Pressing Play must start the turntable loop explicitly in on-demand mode.
  useEffect(() => {
    if (autoRotate) invalidate();
  }, [autoRotate, invalidate]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (autoRotate && c && !c.active && !draggingPart) {
      c.azimuthAngle += delta * 0.25;
      invalidate(); // the turntable is the one thing that renders continuously
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#1a1a1a", 0.6]} />
      <directionalLight position={[6, 10, 6]} intensity={1.8} />
      <directionalLight position={[-8, 5, -6]} intensity={0.5} color="#9fb4ff" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#f5a623" position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 6, 4]} scale={3} />
      </Environment>

      {layout.map(({ product, position }) => (
        <Model
          key={product.id}
          product={product}
          position={position}
          hovered={hoveredId === product.id}
          dimmed={selectedId !== null && selectedId !== product.id}
          wireframe={wireframe}
          command={partCommand}
          resetToken={resetToken}
          showTooltip={!draggingPart}
          onHover={setHoveredId}
          onSelect={(id) => onSelect(id === selectedId ? null : id)}
          onStats={onStats}
          onDragChange={onDragChange}
          registerGroup={(id, g) => {
            if (g) groups.current.set(id, g);
            else groups.current.delete(id);
          }}
        />
      ))}

      <ContactShadows
        frames={draggingPart || settling ? Infinity : 1}
        position={[0, 0.001, 0]}
        opacity={0.55}
        scale={18}
        blur={2.4}
        far={3}
      />
      <Grid
        position={[0, -0.002, 0]}
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#262626"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#3a2a10"
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />

      <CameraControls
        ref={controls}
        makeDefault
        minDistance={1.2}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2 - 0.05}
        smoothTime={0.35}
        onControlStart={onUserInteract}
      />
    </>
  );
}

export default function ThreeDShowcaseCanvas({ active, ...props }: CanvasProps & { active: boolean }) {
  const down = useRef<{ x: number; y: number } | null>(null);
  // Device pixel ratio clamped to at most 1.5x (sharp on retina, far cheaper than 2x; 1x screens stay
  // at 1x), dropping to 1x if the GPU struggles.
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const fellBack = useRef(false);
  return (
    <Canvas
      // Render only when something changes (camera, a moving part, the turntable), and nothing at
      // all while the section is off screen or the tab is hidden.
      frameloop={active ? "demand" : "never"}
      dpr={dpr}
      camera={{ position: [...OVERVIEW.position], fov: 42 }}
      onPointerDown={(e) => (down.current = { x: e.clientX, y: e.clientY })}
      onPointerMissed={(e) => {
        const d = down.current;
        // Only a real click on empty space clears the selection, not the end of an orbit drag.
        if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) props.onSelect(null);
      }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 12, 26]} />
      <Suspense
        fallback={
          <Html center className="font-mono text-sm text-foreground/50 whitespace-nowrap">
            Loading models…
          </Html>
        }
      >
        <Scene {...props} />
        {/* Frame-rate sampling is only meaningful once the models are in (inside Suspense) and
            while rendering continuously (the turntable); with on-demand rendering an idle scene
            would read as a slow GPU. Once it has fallen back to 1x it stays there. */}
        {props.autoRotate && (
          <PerformanceMonitor
            flipflops={3}
            onDecline={() => setDpr([1, 1])}
            onIncline={() => {
              if (!fellBack.current) setDpr([1, 1.5]);
            }}
            onFallback={() => {
              fellBack.current = true;
              setDpr([1, 1]);
            }}
          />
        )}
      </Suspense>
    </Canvas>
  );
}

threeDProducts.forEach((p) => useGLTF.preload(p.modelPath, DRACO_PATH));
