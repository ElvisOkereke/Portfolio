import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ThreeConVGP from "./ThreeConVGP";

type Props = {};

function VentGaugePod({}: Props) {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0  w-[600px] snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50  overflow-hidden 
    duration-200 transition-opacity"
    >
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 50,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{ once: true }} //optional if you want effect only once
      >
        <Image
          className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center "
          src="/pics/s-l500.png"
          height={1000}
          width={1000}
          alt=""
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light md:text-center">Vent Gauge Pod</h4>
        <p className="font-bold text-2xl mt-1 md:text-center">
          (39mm, 41mm Gauges)
        </p>

        <p className="uppercase py-2 text-gray-200 md:text-center">
          Launch Date: TBD 2023
        </p>
        <div className="items-center space-y-5 mt-10">
          <ThreeConVGP />

          <ul className="list-disc space-y-4 text-lg md:text-center list-inside">
            <li>
              3D printed gauge pod for E46 BMWs. Fits 39mm and 41mm gauges.
            </li>
            <li>Works on E46 and 3 Series BMWs.</li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default VentGaugePod;
