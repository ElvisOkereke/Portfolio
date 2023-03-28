import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

function ExperienceCardLVBT({}: Props) {
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
          src="/pics/LVBT_Logo.jpg"
          height={1000}
          width={1000}
          alt=""
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">CEO of BavarianTunes</h4>
        <p className="font-bold text-2xl mt-1">
          Private Label Brand, Automotive Parts
        </p>

        <p className="uppercase py-5 text-gray-200">Start Date: JUNE 2022</p>
        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>
            Private Label Amazon FBA Company, selling bespoke automotive parts
            and electronics with over $2000 in sales (YTD).
          </li>
          <li>
            {" "}
            Bavarian Tunes was created to build BMW performance and enthusiast
            parts, and our goal is to make them readily available in in our
            country Canada. We aim to bring products to the market such as;
            bespoke BMW performance parts, forced induction tunes, and
            accessories.
          </li>
          <Link href="LVBTProducts">
            <li className="py-4 text-[#F7AB0A] cursor-pointer">
              Click here to view our products in 3D
            </li>
          </Link>
        </ul>
      </div>
    </article>
  );
}

export default ExperienceCardLVBT;
