export type ThreeDProduct = {
  id: string;
  title: string;
  subtitle: string;
  /** One or two sentences shown in the hover tooltip and the details panel. */
  description: string;
  /** Short facts shown as chips in the details panel. */
  details: string[];
  modelPath: string;
  /** Display finish for the viewer (not a claim about the real part's material). */
  finish: { color: string; metalness: number; roughness: number };
  /** Extra rotation applied before the model is normalised to the stage. */
  initialRotation?: [number, number, number];
};

export const threeDProducts: ThreeDProduct[] = [
  {
    id: "vband-adapter",
    title: "Custom V-Band Adapter",
    subtitle: "T3 flange → 2.5\" V-band · M52 turbo kits",
    description:
      "Adapts a T3 turbo flange to a 2.5-inch V-band clamp for custom M52 turbo kits, so the downpipe can come off with one clamp.",
    details: ["Fits E36 / E46 / E38 / E39", "M52 custom turbo kits", "T3 → 2.5\" V-band"],
    modelPath: "/models/t3-to-2.5-vband.glb",
    finish: { color: "#c9ccd2", metalness: 0.9, roughness: 0.3 },
  },
  {
    id: "turbo",
    title: "Turbo",
    subtitle: "From my custom turbo build",
    description:
      "The turbocharger from my custom turbo build, modelled in full. It's the most detailed model in the set, so zoom in close.",
    details: ["Custom turbo build", "Highest-detail model"],
    modelPath: "/models/turbo.glb",
    finish: { color: "#9aa0a8", metalness: 0.85, roughness: 0.38 },
  },
  {
    id: "dssr",
    title: "Dual Shear Shifter Linkage",
    subtitle: "E46 5-speed and 6-speed manual",
    description:
      "A dual-shear shifter linkage (DSSR) for E46 manual gearboxes, replacing the sloppy stock linkage for a tighter shift.",
    details: ["E46 3 Series", "5-speed and 6-speed manual", "Designed for CNC"],
    modelPath: "/models/dssr.glb",
    finish: { color: "#d8dade", metalness: 0.95, roughness: 0.22 },
  },
  {
    id: "vent-gauge-pod",
    title: "Vent Gauge Pod",
    subtitle: "39 mm / 41 mm gauges · E46 3 Series",
    description:
      "Replaces an E46 dash air vent with a pod for 39 mm or 41 mm gauges, so boost and AFR sit in the driver's sightline.",
    details: ["E46 3 Series", "39 mm / 41 mm gauges", "3D printed"],
    modelPath: "/models/gauge-pod.glb",
    finish: { color: "#6b6d74", metalness: 0.15, roughness: 0.55 },
  },
  {
    id: "hexmesh-turbo-guard",
    title: "HexMesh Turbo Guard",
    subtitle: "3\" / 3.5\" / 4\" turbo inlets",
    description:
      "A hex-mesh guard for the turbo's compressor inlet. On an open-filter or short-intake setup it keeps debris (and fingers) away from the compressor wheel, and the hex pattern keeps as much open area for airflow as possible.",
    details: ["3\", 3.5\" and 4\" sizes", "Compressor inlet guard", "Hex mesh for open area"],
    modelPath: "/models/hexmesh-turbo-guard.glb",
    finish: { color: "#3d4047", metalness: 0.7, roughness: 0.35 },
  },
  {
    id: "cnc-angle-adapters",
    title: "Aluminum CNC Angle Adapters",
    subtitle: "More steering angle · stock rack and suspension",
    description:
      "Machined aluminum adapters that move the lower control arm's pickup point on the knuckle. That changes the steering geometry to give more steering angle from the stock rack and suspension, a budget route to extra lock for drifting without a full angle kit.",
    details: ["CNC-machined aluminum", "Relocates the LCA pickup on the knuckle", "More lock, stock rack"],
    modelPath: "/models/cnc-angle-adapter.glb",
    finish: { color: "#d4d7dc", metalness: 0.95, roughness: 0.26 },
  },
];
