import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ThreeConAE from "./ThreeConAE";
import ThreeConDssr from "./ThreeConDSSR";

type Props = {};

function Dssr({}: Props) {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[600px] 
     snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50  overflow-hidden 
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
          src="/pics/1673895701-568.png"
          height={1000}
          width={1000}
          alt=""
        />
      </motion.div>

      <div className="">
        <div className="relative ">
          <h4 className="text-4xl font-light md:text-center">
            Dual Shear Shifter Linkage
          </h4>
          <p className="font-bold text-2xl mt-1 md:text-center">
            (E46 5 Spd Manual and 6 Spd Manual)
          </p>

          <p className="uppercase py-2 text-gray-200 md:text-center">
            Launch Date: TBD
          </p>
        </div>
        <div className="space-y-5 mt-10 ">
          <div className="">
            <ThreeConDssr />
          </div>
          <ul className="list-disc space-y-4 text-lg md:text-center list-inside">
            <li>
              The DSSR redistributes the torsional forces from the pin/bushing
              interface to the omplete face area on both sides of the selector
              joint. By taking advantage of the strength of steel in the DSSR
              and the body of the joint, the problem of deformation is
              eliminated and the movement of the selector rod correlates
              directly to movement of the selector joint - the only "free play"
              movement remaining in the shifter assembly is from within the
              transmission itself.
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default Dssr;
