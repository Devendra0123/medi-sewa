import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '../../lib/client';

const index = ({ebooks}) => {
    return (
        <div className="bg-red-200 rounded p-[20px]  mt-[50px]" >
            <div className="flex flex-wrap justify-center gap-[70px]">
                 
                        {ebooks.map(({ name, image, _id, slug }) => (
                            <Link key={_id} href={`/ebook/${slug.current}`}>
                                <div className='cursor-pointer'>
                                    <Image
                                        src={urlFor(image && image).url()}
                                        width={150}
                                        height={200}
                                        className="rounded"
                                    />
                                    <p className='font-[poppins] w-[10rem] text-center'>
                                        {name}
                                    </p>
                                </div>
                            </Link>
                        ))}
            </div>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const ebooksQuery = '*[_type == "ebook"]'

    const ebooks = await client.fetch(ebooksQuery);
    return {
        props: {
            ebooks
        },
        revalidate: 10,
    }
}

export default index