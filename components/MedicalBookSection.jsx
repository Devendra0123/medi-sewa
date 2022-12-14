import React from 'react'
import { urlFor } from '../lib/client';
import Image from 'next/image';
import Link from 'next/link'

const MedicalBooks = ({ books }) => {
  return (
    <div className='bg-gradient-to-r from-teal-500 py-[20px]'>
      <div className='w-full flex justify-start md:justify-center items-center flex-nowrap overflow-x-scroll md:flex-wrap'>
        {books.map(({ name, image, _id, slug, price }) => (
          <Link key={_id} href={`/medical-books/${slug.current}`}>
            <div className='flex flex-col items-center mt-[20px]'>
              <div className='relative w-max'>
                <Image
                  src={urlFor(image[0] && image[0]).url()}
                  width={170}
                  height={220}
                  className="rounded"
                />
                <p className='absolute bottom-[10px] right-0 bg-red-300 py-[5px] px-[10px] font-bold rounded-l-xl '>
                  Rs.{price}
                </p>
              </div>
              <p className='font-[poppins] w-[15rem] font-medium text-center'>
                {name.length > 15 ? name.slice(0, 15) + '...' : name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MedicalBooks