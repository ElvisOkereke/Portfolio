import React from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid"
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string,
  email: string,
  subject: string,
  message: string,
};

type Props = {}

function Contact({}: Props) {
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = formData => {

        
        window.location.href = 'mailto:elvisokereke.eo@gmail.com?subject='+ formData.subject + '&body=Hi, my name is ' 
        + formData.name + '. ' + formData.message;
        
    };
  
  return (
    <div className='h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Contact</h3>

        <div className='flex flex-col space-y-10'>
        <h4 className='text-4xl font-semibold text-center'>
            Contact Me for job offers or business inquiries below {" "}
            <span className='decoration-[#F7AB0A]/50 underline'>Let's talk!</span>
        </h4>

        <div className='space-y-10'>
            <div className='flex items-center space-x-5 justify-center'>
                <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                <p className='text-2xl'>+4379948839</p>
            </div>
            <div className='flex items-center space-x-5 justify-center'>
                <EnvelopeIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                <p className='text-2xl'>ElvisOkereke.eo@gmail.com</p>
            </div>
            <div className='flex items-center space-x-5 justify-center'>
                <MapPinIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                <p className='text-2xl'>Toronto, Canada</p>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 w0fit mx-auto'>
            <div className='flex space-x-2'>
                <input {...register('name')}className='contactInput' placeholder='Name' type='text'/>
                <input {...register('email')} className='contactInput' type='email' placeholder='Email'/>

            </div>
            <input {...register('subject')} className='contactInput' placeholder='Subject' type='text'></input>

            <textarea {...register('message')} className='contactInput' placeholder='Message'></textarea>
            <button type='submit' className='bg-[#F7AB0A] text-black py-5 px-10 rounded-md font-bold text-lg'>Submit</button>
        </form>  
        </div>
    </div>
  )
}

export default Contact