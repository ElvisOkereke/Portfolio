/* eslint-disable react/jsx-key */
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {}; //npm run dev

function Projects({}: Props) {
  const projects = [1, 2, 3];
  const links = [
    "https://data-log-viewer-2mrxicpt0-elvisokerekes-projects.vercel.app/",
    "https://github.com/ElvisOkereke/flutter_logviewer",
    "",
  ];
  const titles = [
    "NextJs DataLogViewer",
    "DataLogViewer2.0 with Flutter",
    "SWE Capstone Project - Minimizing Bias In LLMs",
  ];
  const descriptions = [
    [
      "- Developed Python/PyTorch-based fine-tuning scripts to reduce bias in large language models, Achieved a 20% reduction in measured bias while maintaining model performance.",
      "- Implemented advanced techniques including Social Contact Debias, Gender Logits, and Custom Loss Functions.",
      "- Integrated with Hugging Face and Perspective API for model evaluation and improvement.",
    ],
    [
      "- Displays, archives, and classifies over 100 automotive performance datalogs.",
      "- Leverages Pytorch Lighting LSTM to categorize data into 3 distinct classes, streamlining analysis and knowledge mining processes",
      "- Made with Flutter/Dart for cross-platform Desktop compatibility.",
    ],
    [
      "- Full Stack site utilizing MongoDB Atlas, Express.js, React, and NodeJS.",
      "- Displays, archives, and classifies over 100 automotive performance datalogs.",
      "- Utilizes NextJs for server-side rendering and dynamic routing.",
    ],
  ];
  const images = ["/pics/pngegg_7.png", "/pics/chart.png", "/pics/1.0.png"];
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
      className="flex relative flex-col h-screen text-left overflow-hidden md:flex-row max-w-full px-10 justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div
        className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
      >
        {projects.map((project, i) => (
          <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 h-50">
            <motion.div
              initial={{
                opacity: 0,
                y: -300,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              viewport={{
                once: true,
              }}
            >
              <Link href={links[i]}>
                <Image src={images[i]} height={600} width={600} alt="" />
              </Link>
            </motion.div>

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50">
                  Project {i + 1} of {projects.length}
                </span>
                {" " + titles[i]}
              </h4>
              <ul className="text-lg text-center md:text-left">
                <li>{descriptions[i][0]}</li>
                <li>{descriptions[i][1]}</li>
                <li>{descriptions[i][2]}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}

export default Projects;
