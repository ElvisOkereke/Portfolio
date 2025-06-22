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
        <Image src="/pics/dp-min.jpg" height={1000} width={1000} alt="" className="rounded-full " />
      </motion.div>
      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">My background</h4>
        <p className="">
          As a Software Engineering graduate from Toronto Metropolitan University, I am passionate about creativity, productivity, and building productivity-focused applications.<br/><br/> 

Through my professional and hobbyist experience developing SaaS applications with production-level tech stacks, I have honed my ability to create scalable, efficient products. 
<br/>
<br/>Check out my GitHub! - https://github.com/ElvisOkereke (Also linked in the top left)
<br/><br/>
Academically, one of my best achievements was completing our Capstone project focused on
Mitigating Bias in large language models. The team developed PyTorch Fine Tuning Scripts for Sequential and Causal Models, leveraging PHD Papers and researched techniques such as; Social Contact Debias, and Gender Logits to reduce bias in LLM outputs by up to 50%, while maintaining model performance due to optimization strategies such as LoRA Configs, and Parameter Efficient Fine-tuning. (Also featured on GitHub)
<br/>
<br/>I'm actively exploring new opportunities and would welcome the chance to discuss how I could contribute to your team. Feel free to reach out if you'd like to connect.
        </p>
      </div>
    </motion.div>
  );
}

export default About;
