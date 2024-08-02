import React from "react";
import { motion } from "framer-motion";
import ExperienceCardMS from "./ExpCards/ExperienceCardMS";
import ExperienceCardTut from "./ExpCards/ExperienceCardTut";
import ExperienceCardLVBT from "./ExpCards/ExperienceCardLVBT";
import ExperienceCardDS from "./ExpCards/ExperienceCardDS";
import ExperienceCardCanLife from "./ExpCards/ExperienceCardCanLife";

type Props = {};

function WorkExperience({}: Props) {
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
      className="flex relative flex-col h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div
        className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
      >
        <ExperienceCardLVBT />
        <ExperienceCardMS />
        <ExperienceCardCanLife />
        <ExperienceCardDS />
        <ExperienceCardTut />
      </div>
    </motion.div>
  );
}

export default WorkExperience;
