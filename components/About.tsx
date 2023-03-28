/* eslint react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {};

function About({}: Props) {
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
      <h3 className="absolute top-24 uppercase tracking-[15px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        //viewport={{once: true}} optional if you want effect only once
        className="-mb-20 md:mb-0 flex-shrink-0 w-60 h-60 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      >
        <Image src="/pics/Shlam.jpg" height={1000} width={1000} alt="" />
      </motion.div>
      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">My background</h4>
        <p>
          I am currently a Computer Engineering student at Ryerson University,
          pursuing a Bachelor&apos;s Degree. Creativity and Productivity are my
          passions. I enjoy programming, automotive engineering, and motorsport.
          They have been my passions for the past 5 years, and have many side
          projects including; games, ML models WebDev, and mobile apps. Feel
          free to check out my GitHub, LinkedIn, and Youtube links at top of the
          page!
        </p>
      </div>
    </motion.div>
  );
}

export default About;
