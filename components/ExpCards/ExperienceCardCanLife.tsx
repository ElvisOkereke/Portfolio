import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {};

function ExperienceCardTut({}: Props) {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] 
    xl:w-[900px] snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50 overflow-hidden 
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
          src="/pics/channels4_profile.jpg"
          height={1000}
          width={1000}
          alt=""
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Automation and Data Specialist</h4>
        <p className="font-bold text-2xl mt-1">
          Canada Life Insurance, Toronto
        </p>
        <p className="uppercase py-5 text-gray-200">
          Start/End Date: Jan 2024 to Apr 2024
        </p>
        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>
            Worked with automated and data integrated solutions among existing
            and new systems with legacy and emergent technologies (Jenkins,
            Zephyr, Apache Kafka)
          </li>
          <li>
            Created a Testing Data Dashboard project, increasing the efficiency
            of Testing Team Leads.
          </li>
          <li>
            Contributed to the development of the automated solutions and
            framework enhancements
          </li>
          <li>
            Gained a clear understanding of business problems and helped define
            automated solutions.
          </li>
        </ul>
      </div>
    </article>
  );
}

export default ExperienceCardTut;
