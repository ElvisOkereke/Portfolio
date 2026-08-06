export type ThreeDProduct = {
  id: string;
  title: string;
  subtitle: string;
  modelPath: string;
  scale: number;
  initialRotation?: [number, number, number];
};

export const threeDProducts: ThreeDProduct[] = [
  {
    id: "vband-adapter",
    title: "Custom VBand Adapter",
    subtitle: "For M52 custom turbo kits — fits E36/E46/E38/E39 BMWs",
    modelPath: "/models/t3-to-2.5-vband.glb",
    scale: 0.08,
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0],
  },
  {
    id: "turbo",
    title: "Turbo",
    subtitle: "Custom turbo build",
    modelPath: "/models/turbo.glb",
    scale: 0.1,
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0],
  },
  {
    id: "dssr",
    title: "Dual Shear Shifter Linkage",
    subtitle: "E46 5-speed and 6-speed manual",
    modelPath: "/models/dssr.glb",
    scale: 0.15,
  },
  {
    id: "vent-gauge-pod",
    title: "Vent Gauge Pod",
    subtitle: "39mm/41mm gauges, E46 3 Series",
    modelPath: "/models/gauge-pod.glb",
    scale: 0.04,
    initialRotation: [0, -Math.PI / 2 - Math.PI / 4, 0],
  },
];
