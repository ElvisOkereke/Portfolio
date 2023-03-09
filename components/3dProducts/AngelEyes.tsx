import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThreeConAE from './ThreeConAE';


type Props = {}

function AngelEyes({}: Props) {



  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] 
    xl:w-[900px] snap-center p-10 bg-[#292929] hover:opacity-100 opacity-50  overflow-hidden 
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
          src='https://cdn.discordapp.com/attachments/705799653848776784/1083124260106670110/FeatureImagerings.jpg'  
          height={1000} width={1000} alt=''/>
        </motion.div>

        <div className=''>
            <div className='relative '> 
            <h4 className='text-4xl font-light md:text-center'>
                Crystal Angel Eyes
            </h4>
            <p className='font-bold text-2xl mt-1 md:text-center'>
            (Switchback, Xenon or Halogen)
            </p>

            <p className='uppercase py-2 text-gray-200 md:text-center'>Launch Date: JUNE 2022
            </p>
           
           </div>
            <div className='items-center space-y-5 mt-10'>
            <ThreeConAE/>
            <ul className='list-disc space-y-4 text-lg md:text-center list-inside'>
                <li>Switchback technology, halos are White when DRL <br/>and blink Amber with turn signal!</li>
                <li>Works on E46 and E36 - 3 Series, <br/>E38   - 7 Series, E39 - 5 Series, BMWs.</li>
            </ul>
            </div>
            
            
        </div>
    </article>
  )
}

export default AngelEyes