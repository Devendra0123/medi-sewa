import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

import { client, urlFor } from '../../lib/client';

const EbookDetails = ({ ebooks, ebook }) => {

    const { image, name, description, author, publication, ebookURL } = ebook;

    return (
        <div className='mt-[30px]'>
            <div className='flex'>
                <div>
                    <img src={urlFor(image && image).url()} className="product-detail-image" />
                </div>
                <div className='px-[20px]'>
                    <h2 className='font-bold text-xl'>
                        {name}
                    </h2>
                    <p className='font-[poppins] py-[10px]'>
                        {description}
                    </p>
                    <p className='font-[poppins] py-[5px]'>
                        Author : {author}
                    </p>
                    <p className='font-[poppins] py-[5px]'>
                        Publication: {publication}
                    </p>
                    <div>
                        <a href={`${ebookURL}`} target="_blank" rel="noreferrer">
                            <button className='px-[15px] py-[10px] border-2 border-orange-400 rounded mr-[20px] '>
                                Open PDF
                            </button>
                        </a>
                        <a href={`${ebookURL}?dl=`} download >
                            <button className='px-[15px] py-[10px] bg-orange-400 rounded '>
                                Download PDF
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div>
                <div className="maylike-products-wrapper">
                    <h2>You may like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {ebooks.map(({ name, image, _id, slug }) => (
                                <Link key={_id} href={`/ebook/${slug.current}`}>
                                    <div>
                                        <Image
                                            src={urlFor(image && image).url()}
                                            width={150}
                                            height={200}
                                            className="rounded"
                                        />
                                        <p className='font-[poppins] w-[15rem]'>
                                            {name}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "ebook"] {
      slug {
        current
      }
    }
    `;

    const ebooks = await client.fetch(query);

    const paths = ebooks.map((item) => ({
        params: {
            slug: item.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "ebook" && slug.current == '${slug}'][0] {
        name,
        image,
        description,
        author,
        publication,
        "ebookURL": file.asset->url
      }`;
    const ebooksQuery = '*[_type == "ebook"]'

    const ebook = await client.fetch(query);
    const ebooks = await client.fetch(ebooksQuery);

    return {
        props: { ebook, ebooks }
    }
}

export default EbookDetails