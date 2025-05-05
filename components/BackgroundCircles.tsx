import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

function BackgroundCircles({}: Props) {
  return (
    <motion.div 
    initial={{
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: [1.15,1.3,1.5,1]
      }}
      transition={{
        duration: 3.2
      }}
    className='relative flex justify-center items-center'>
        <div className='absolute border border-gray-400 rounded-full h-[200px] w-[200px] mt-52 animate-ping opacity-25'/>
        <div className='absolute border border-red-400 rounded-full h-[300px] w-[300px] mt-52 animate-ping opacity-25'/>
        <div className='absolute border border-blue-400 rounded-full h-[500px] w-[500px] mt-52 animate-ping opacity-25'/>
        <div className='absolute border border-gray-400 rounded-full h-[650px] w-[650px] mt-52 animate-pulse opacity-5'/>
        <div className='absolute border border-gray-400 rounded-full h-[800px] w-[800px] mt-52 animate-pulse opacity-5'/>
    </motion.div>
    
  )
}

export default BackgroundCircles