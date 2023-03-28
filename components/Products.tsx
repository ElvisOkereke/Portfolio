import React from "react";
import { motion } from "framer-motion";
import ExperienceCardTut from "./ExpCards/ExperienceCardTut";
import AngelEyes from "./3dProducts/AngelEyes";
import VentGaugePod from "./3dProducts/VentGaugePod";
import Dssr from "./3dProducts/DSSR";

type Props = {};

function Products({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
      }}
      className="flex relative flex-col h-8xl text-center md:text-left md:flex-row max-w-8xl px-10 justify-evenly mx-auto items-center"
    >
      <div
        className="w-6xl flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
      >
        <Dssr />
        <VentGaugePod />
        <AngelEyes />
      </div>
    </motion.div>
  );
}

export default Products;
