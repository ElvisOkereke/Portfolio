import React from 'react'
import { motion } from 'framer-motion'
import SkillHTML from './SkillIcons/SkillHTML'
import SkillCSS from './SkillIcons/SkillCSS'
import SkillJS from './SkillIcons/SkillJS'
import SkillNode from './SkillIcons/SkillNode'
import SkillReact from './SkillIcons/SkillReact'
import SkillC from './SkillIcons/SkillC'
import SkillCplusplus from './SkillIcons/SkillCplusplus'
import SkillCsharp from './SkillIcons/SkillCsharp'
import SkillPython from './SkillIcons/SkillPython'
import SkillUnity from './SkillIcons/SkillUnity'
import SkillJava from './SkillIcons/SkillJava'
import SkillSQL from './SkillIcons/SkillSQL'
import SkillNext from './SkillIcons/SkillNext'
import SkillThree from './SkillIcons/SkillThree'
import SkillVercel from './SkillIcons/SkillVercel'
import SkillSanity from './SkillIcons/SkillSanity'

type Props = {}

function Skills({}: Props) {
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
    className='flex relative flex-col h-screen text-center md:text-left md:flex-row px-10 justify-evenly mx-auto items-center
    xl:flex-row max-w-[2000px] xl:px-10 min-h-screen'>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Skills</h3>
        <h3 className='absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>Hover skills to view proficiencies</h3>
        <div className='grid grid-cols-4 gap-5'>
            <SkillHTML/>
            <SkillC/>
            <SkillCSS/>
            <SkillCplusplus/>
            <SkillJS/>
            <SkillCsharp/>
            <SkillNode/>
            <SkillPython/>
            <SkillReact/>
            <SkillUnity/>
            <SkillJava/>
            <SkillSQL/>
            <SkillNext/>
            <SkillThree/>
            <SkillVercel/>
            <SkillSanity/>
            
        </div>
    </motion.div>
  )
}

export default Skills