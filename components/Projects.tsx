/* eslint-disable react/jsx-key */
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';

type Props = {}

function Projects({}: Props) {
    const projects = [1,2,3];
    const titles = ["Python DataLogViewer w/TensorFlow","2D Dungeon Crawler","2D Dungeon Crawler"];
    const descriptions = [["- Full Stack site utilizing MongoDB Atlas, Express.js, React, and NodeJS.","- Displays, archives, and classifies over 100 automotive performance datalogs.","- Leverages Pytorch Lighting LSTM to categorize data into 3 distinct classes, streamlining analysis and knowledge mining processes"],
    [" - Unity Platformer with unique combat, movement, and Boss fights."," - Unity Platformer with unique combat, movement, and Boss fights."," - Unity Platformer with unique combat, movement, and Boss fights."],
    ["test","test","test"],];
    const images = ["https://cdn.discordapp.com/attachments/705799653848776784/1082468674323095562/pngegg_7.png",
    "https://cdn.discordapp.com/attachments/705799653848776784/1082845480838504478/ZH9wgi.png",
    "https://cdn.discordapp.com/attachments/705799653848776784/1082845480838504478/ZH9wgi.png"]
  return (
    <motion.div 
    initial = {{
        opacity: 0
    }}
    whileInView={{
        opacity:1
    }}
    transition={{
        duration: 2
    }} 
    className='flex relative flex-col h-screen text-left overflow-hidden md:flex-row max-w-full px-10 justify-evenly mx-auto items-center z-0'>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Projects</h3>

        <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]'>
            {projects.map((project,i) => (
                <div className='w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 h-50'>
                    <motion.div
                    initial = {{
                        opacity: 0,
                        y:-300
                    }}
                    whileInView={{
                        opacity:1,
                        y:0
                    }}
                    transition={{
                        duration: 1
                    }} 
                    viewport={{
                        once:true
                    }}>
                        <Image
                        src = {images[i]}  
                        height={250} width={250} alt=''/>
                    </motion.div>

                    <div className='space-y-10 px-0 md:px-10 max-w-6xl'>
                        <h4 className='text-4xl font-semibold text-center'>
                            <span className='underline decoration-[#F7AB0A]/50'>Project {i+1} of {projects.length}</span>{" " + titles[i]}
                            
                        </h4>
                        <ul className='text-lg text-center md:text-left'>
                        <li >{descriptions[i][0]}</li>
                        <li>{descriptions[i][1]}</li>
                        <li>{descriptions[i][2]}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
        <div className='w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12'></div>
    </motion.div>
  )
}

export default Projects