import Head from 'next/head'
import { Inter } from 'next/font/google'
import Banner from '@/components/banner'
import Hero from '@/components/hero'
import { SocialIcon } from 'react-social-icons'
import About from '@/components/About'
import WorkExperience from '@/components/WorkExperience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Link from 'next/link'
import Image from 'next/image'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='bg-[rgb(36,36,36)] text-white h-screen snap-mandatory
       snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]'>

      <Head>
        <title>Elvis' Portfolio</title>
      </Head>
      <Banner/>

      <section id='hero' className='snap-start'>
        <Hero/>
      </section>

      <section id='about' className='snap-center'>
        <About/>
      </section>

      <section id='experience' className='snap-center'>
        <WorkExperience/>
      </section>

      <section id='skills' className='snap-start'>
        <Skills/>
      </section>

      <section id='projects' className='snap-start'>
        <Projects/>
      </section>

      <section id='contact' className='snap-start'>
        <Contact/>
        
      </section>
      
          <footer className='sticky bottom-5 w-full cursor-pointer'>
            <div className='flex items-center justify-center'><Link href='#hero'>
            <Image 
            className='h-10 w-10 opacity-25 hover:opacity-100'
          src='https://cdn.discordapp.com/attachments/705799653848776784/1082830344140640326/pngegg_8.png'  
          height={500} width={500} alt=''/></Link>
            </div>
          </footer>
      
      
      
      </div>


    </>
  )
}
