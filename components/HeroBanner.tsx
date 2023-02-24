import React from 'react'
import Image from 'next/image';
import type { BannerType } from '../type';
import { urlFor } from '../lib/client';
import Link from 'next/link';

type Props = {
  bannerData: BannerType[]
}

const HeroBanner: React.FC<Props> = ({ bannerData }) => {

  const src = urlFor(bannerData[0].image && bannerData[0].image).url()

  return (
    <div className='hero-banner-container'>
      <div className='circle'></div>
      {/* .... Left Div .... */}
      <div className='w-full flex flex-col flex-end justify-center items-center md:w-1/2 h-full z-10 mt-[-80px] md:mt-[-60px]'>
        <div>
          <h2 className='text-3xl'>
            <span className='text-teal-400 font-bold text-4xl pr-1'>Medisewa</span>
            brings your products<br /> at your doorstep
          </h2>
          <p className='py-2 leading-5 text-xl'>
            Most trusted company by<br /> team of doctors.
            <span className="offer-text">{bannerData[0].offer}</span>
          </p>
          <Link href='/product'>
            <button className='bg-teal-400 py-[12px] px-[13px] rounded font-[poppins] font-bold mt-[10px] transition ease-in-out duration-300 hover:bg-orange-500 hover:text-white'>
              Go to Store
            </button>
          </Link>
        </div>

        <div className='plus bottom-[-50px]'></div>

      </div>


      {/* .... Right Div .... */}
      <div className='hero-banner-right-div'>
        <Image className='hidden md:block ' src={src} alt='img'
          width={350}
          height={350}
        />
        <div className='absolute top-[-20px] left-[-30px]'>
          <div className='plus-circle'>
            <div className='plus'></div>
          </div>
        </div>
      </div>

      {/*..... Empty Dev ........*/}
      <div className='absolute bottom-0 left-0 w-full h-[7rem] bg-white z-20'>
      </div>
    </div>
  )
}

export default HeroBanner
