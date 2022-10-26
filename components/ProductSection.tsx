import React from 'react';
import Image from 'next/image'
import doctorImg from '../assets/doctor_img.png';
import dentureImg from '../assets/denture_img.png';
import Product from './Product';

import type { ProductType } from '../type'
import Link from 'next/link';

type Props = {
    products: ProductType[],
    category: string,
    store: string,
    bgChange: boolean
}

const ProductSection: React.FC<Props> = ({ products, category, store, bgChange }) => {

    const image = category == 'scrub' ? doctorImg : category == 'dental-products' ? dentureImg : doctorImg
    return (
        <div className='flex flex-col items-center md:flex-row md:items-center justify-center mb-[30px]'>

            {/* ....... Left Div .......*/}
            <div className={`w-11/12 flex flex-col items-center justify-center ${bgChange ? 'bg-amber-300' : 'bg-teal-400'} md:w-1/4 h-[25rem] rounded-2xl`}>
                <Image src={image} alt='img' width={400} height={300} />
                <p className='text-center p-[10px] font-[poppins] font-semibold'>
                    {`We deliver best quality ${category} all over Kathmandu and near city.`}
                </p>
                <Link href={{
                    pathname: `/product`,
                    query: { category: `${category}` },
                }}>
                    <button className='bg-orange-500 py-[5px] px-[10px] rounded mt-[10px] text-white font-semibold hover:bg-orange-200 hover:text-black'>
                        {store}
                    </button>
                </Link>
            </div>

            {/*........Right Div ........*/}
            <div className='w-full gap-x-[30px] px-[10px] py-[20px] md:p-[20px] flex grow justify-start items-center flex-nowrap overflow-x-scroll'>
                {products?.map((product) => <Product key={product?._id} product={product} />)}
            </div>
        </div>
    )
}

export default ProductSection