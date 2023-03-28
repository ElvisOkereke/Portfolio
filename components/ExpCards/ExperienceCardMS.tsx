import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {};

function ExperienceCardMS({}: Props) {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] 
    xl:w-[900px] snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50  overflow-hidden 
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
          src="/pics/ms_logo.png"
          height={1000}
          width={1000}
          alt=""
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Explore Intern</h4>
        <p className="font-bold text-2xl mt-1">Microsoft Corp, Toronto</p>
        <div className="flex space-x-2 my-2">
          <Image
            className="w-10 h-10"
            src="/pics/pngegg.png"
            height={1000}
            width={1000}
            alt=""
          />
          <Image
            className="w-10 h-10"
            src="/pics/Azure-Logo-Transparent.png"
            height={1000}
            width={1000}
            alt=""
          />
          <Image
            className="w-12 h-10"
            src="/pics/pngegg_2.png"
            height={1000}
            width={1000}
            alt=""
          />
        </div>
        <p className="uppercase py-5 text-gray-200">
          Start/End Date: MAY 2022 to AUGUST 2022
        </p>
        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>
            Developed with technologies including, Microsoft Azure Cloud, Data,
            AI, & Cyber Security
          </li>
          <li>
            Participated in an Internal Hackathon, presented business tech
            solutions to over 10+ large Canadian company executives eg.(RBC,
            CIBC, and Microsoft)
          </li>
        </ul>
      </div>
    </article>
  );
}

export default ExperienceCardMS;
