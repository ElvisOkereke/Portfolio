import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCardTut from './ExpCards/ExperienceCardTut'
import AngelEyes from './3dProducts/AngelEyes'
import VentGaugePod from './3dProducts/VentGaugePod'

type Props = {}

function Products({}: Props) {
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
    className='flex relative flex-col h-screen text-center md:text-left md:flex-row max-w-8xl px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>lvbt products</h3>

        <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]'>
            <AngelEyes/>
            <VentGaugePod/>
            <VentGaugePod/>
            <VentGaugePod/>
        </div>
    </motion.div>
  )
}

export default Products