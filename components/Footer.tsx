import Image from 'next/image'
import React from 'react'

import { TiSocialFacebook } from 'react-icons/ti';
import { IoLogoInstagram } from 'react-icons/io';
import { TbBrandTiktok } from 'react-icons/tb';
import { AiOutlineYoutube } from 'react-icons/ai';
import { CgMail } from 'react-icons/cg';
import { GoLocation } from 'react-icons/go';
import { IoIosCall } from 'react-icons/io'
import Link from 'next/link';

const Footer = () => {
  const style = 'font-[poppins] p-[5px] cursor-pointer'
  return (
    <div className='w-full flex flex-col items-center md:flex-row flex-wrap md:justify-evenly mt-[50px] py-[20px]'>
      <div className='w-full md:w-1/4 flex flex-col items-center'>
        <Image src="/logo.png"
          width={150} height={50} alt="logo" />
        <h1 className='text-orange-400 font-medium text-xl pr-1 text-center'>
          Company owned by the team of doctors for doctors
        </h1>
      </div>

      <div className='w-full md:w-1/4'>
        <h2 className='font-bold text-teal-400'>
          Explore
        </h2>
        <ul>
          <Link href='/'>
            <p className={style}>Home</p>
          </Link>

          <Link href='/product'>
            <p className={style}>Store</p>
          </Link>

          <Link href='/ebook'>
            <p className={style}>Ebook</p>
          </Link>

          <Link href='/past-question'>
            <p className={style}>Past Questions</p>
          </Link>

          <Link href='/blog'>
            <p className={style}>Blog</p>
          </Link>

        </ul>
      </div>

      <div className='w-full md:w-1/4'>
        <h2 className='font-bold text-teal-400'>
          Follow Us
        </h2>
        <a target="_blank" href={`https://www.facebook.com/medisewa24`} className='flex items-center' rel="noopener noreferrer">
          <TiSocialFacebook />
          <p className={style}>facebook</p>
        </a>
        <a target="_blank" href={`https://www.instagram.com/medi_sewa/`} className='flex items-center' rel="noopener noreferrer">
          <IoLogoInstagram />
          <p className={style}>Instagram</p>
        </a>
        <a target="_blank" href={`https://www.instagram.com/medi_sarcasm/`} className='flex items-center' rel="noopener noreferrer">
          <AiOutlineYoutube />
          <p className={style}>Mediscrubs</p>
        </a>
        <a target="_blank" href={`https://www.tiktok.com/@medisewa/`} className='flex items-center' rel="noopener noreferrer">
          <TbBrandTiktok />
          <p className={style}>Tiktok</p>
        </a>
      </div>

      <div className='w-full md:w-1/4'>
        <h2 className='font-bold text-teal-400'>Contact Us</h2>
        <div className='flex items-center'>
          <IoIosCall />
          <p className={style}>9861898195, 9840355701</p>
        </div>
        <div className='flex items-center'>
          <CgMail />
          <p className={style}>Medisewa7@gmail.com</p>
        </div>
        <div className='flex items-center'>
          <GoLocation />
          <p className={style}>Sitapaila, Kathmandu</p>
        </div>
      </div>
    </div>
  )
}

export default Footer