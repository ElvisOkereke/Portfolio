import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';


type Props = {}

function ExperienceCardTut({}: Props) {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] 
    xl:w-[900px] snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50 overflow-hidden 
    duration-200 transition-opacity'>        
    <motion.div
        initial = {{
            y: -100,
            opacity: 0
        }}
        whileInView={{
            y:0,
            opacity:50
        }}
        transition={{
            duration: 0.8
        }}      
        viewport={{once: true}} //optional if you want effect only once
        >
        <Image
            className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center ' 
          src='https://cdn.discordapp.com/attachments/705799653848776784/1082843962873745529/NPdtSmXg_400x400.png'  
          height={1000} width={1000} alt=''/>
        </motion.div>

        <div className='px-0 md:px-10'>
            <h4 className='text-4xl font-light'>
            High School STEM Tutor
            </h4>
            <p className='font-bold text-2xl mt-1'>
            Tutor Doctor Corporation, Toronto
            </p>
            <p className='uppercase py-5 text-gray-200'>Start/End Date: Sept 2022 to Sept 2022
            </p>
            <ul className='list-disc space-y-4 ml-5 text-lg'>
                <li>Tutored 15+ students in High School STEM courses. Ranging from Grade 9-12</li>
                
            </ul>
        </div>
    </article>
  )
}

export default ExperienceCardTut