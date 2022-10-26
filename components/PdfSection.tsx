import React from 'react'
import { EbookType } from '../type';
import { urlFor } from '../lib/client';
import Image from 'next/image';
import Link from 'next/link'

type Props = {
    ebooks: EbookType[]
}

const PdfSection: React.FC<Props> = ({ ebooks }) => {

    return (
        <div className='bg-[#ebebeb] rounded-xl mt-[20px]'>
            <div className="maylike-products-wrapper">
                <h2 className='font-bold text-center font-[poppins] text-lg pt-[30px] text-black'>
                    Ebook for Medical students
                </h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {ebooks.map(({ name, image, _id, slug }) => (
                            <Link key={_id} href={`/ebook/${slug.current}`}>
                                <div className='flex flex-col items-center'>
                                    <Image
                                        src={urlFor(image && image).url()}
                                        width={150}
                                        height={200}
                                        className="rounded"
                                    />
                                    <p className='font-[poppins] w-[15rem] font-medium text-center'>
                                        {name.length > 15 ? name.slice(0, 15) + '...' : name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PdfSection