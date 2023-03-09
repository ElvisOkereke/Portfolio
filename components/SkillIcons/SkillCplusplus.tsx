import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
}

function SkillCplusplus({ }: Props) {
  return (
  <div className='group relative flex cursor-pointer'>
    <motion.div
    className='group relative flex cursor-pointer'
    initial = {{
        
        opacity: 0,
    }}
    whileInView={{
        opacity:[0,0.4,1],
        x : 0
    }}
    transition={{
        duration: 2
    }} >
          <Image
                className='rounded-full border border-gray-500 object-cover w-24 h-24 xl:w-32 xl:h-32 filter 
                group-hover:grayscale transition duration-300 ease-in-out' 
                src='https://cdn.discordapp.com/attachments/705799653848776784/1082838927368528094/pngegg_13.png'  
                height={1000} width={1000} alt=''/>

    </motion.div>
    <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out 
    group-hover:bg-white h-24 w-24 md:w-24 md:h-24 xl:w-32 xl:h-32 rounded-full z-0'>
        <div className='flex items-center justify-center h-full'>
            <p className='text-3xl font-bold text-black opacity-100'>100%</p>    
        </div>    
    </div>    

</div>
  )
}

export default SkillCplusplus