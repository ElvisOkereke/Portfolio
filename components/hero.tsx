import React, { Suspense } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import HeroHeadshot from "../public/Shlam.jpg";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import ThreeConTurbo from "./3dProducts/ThreeConTurbo";

type Props = {};

export default function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: [
      "Hello",
      "My name is Elvis",
      "I'm a ['Software', 'Engineering', 'Student'],",
      "<Entrepreneur />, &carLover!",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      <div className="relative rounded-full h-40 w-40 mx-auto object-cover">
        <Image src="/pics/Shlam.jpg" height={1000} width={5000} alt="" />
      </div>

      <div className="z-20">
        <h2 className="uppercase text-sm text-gray-500 pb-2 tracking-[15px]">
          ELVIS OKEREKE
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10 py-5">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A"></Cursor>
        </h1>

        <div>
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
          
        </div>
        
        

        
      </div>
    </div>
  );
}
