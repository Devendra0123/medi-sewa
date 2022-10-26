import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'
import Product from './Product'

const SecondHandMarket = ({ products, books }) => {
    return (
        <div className='flex flex-col items-center mt-[40px] bg-gradient-to-r from-teal-500 p-[10px] md:p-[20px] rounded-xl '>
            <h2 className='text-center font-[poppins] font-bold text-xl'>
                Second Hand Marketplace
            </h2>
            <p className="font-['lobster'] text-orange-500 text-xl font-medium">
                Buy second hand products and books at affordable price.
            </p>
            <div className='w-full p-[20px] flex justify-start md:justify-center items-center flex-nowrap overflow-x-scroll'>
                {products?.map((product) => <Product key={product._id} product={product} />)}
            </div>

            <div className='w-full px-[0px] md:p-[20px] flex justify-start md:justify-center items-center flex-nowrap overflow-x-scroll mt-[30px]'>
                {books?.map(({ name, image, _id, slug, price }) => (
                    <Link key={_id} href={`/medical-books/${slug.current}`}>
                        <div className='flex flex-col items-center'>
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
                            <p className='font-[poppins] w-[15rem] text-center font-medium'>
                                {name.length > 15 ? name.slice(0,15) + '...' : name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <button className='bg-orange-500 mt-[20px] font-medium py-[10px] px-[15px] rounded-lg'>
                Visit Store
            </button>
        </div>
    )
}

export default SecondHandMarket