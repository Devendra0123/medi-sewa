import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Categories } from '../../components';
import { client } from '../../lib/client';
import { bookCategories } from '../../utils/categories';
import { urlFor } from '../../lib/client';
import Image from 'next/image';
import Link from 'next/link'
import {BsThreeDots} from 'react-icons/bs';

const Index = ({ books }) => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        setToggle(false)
        const category = router.query.category
        if (category) {
            const items = books?.filter(item => item.categories[0] === category);
            items ? setData(items) : setData([])
        } else {
            setData(books)
        }
    }, [router.query.category])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[30px]">

            <div className="relative flex flex-row lg:flex-col justify-between lg:justify-start lg:col-span-3 col-span-1 px-[10px]">
            <div 
                className='block lg:hidden absolute top-[0px] right-[10px] bg-slate-300 h-[3rem] w-[3rem] rounded-full flex items-center justify-center font-bold text-2xl'
                onClick={()=> setToggle(prev => !prev)}>
                    <BsThreeDots />
                </div>
                <div className={`${toggle ? 'block absolute top-[50px] md:top-[70px] right-[10px] z-10' : 'hidden'} lg:block lg:sticky md:relative md:top-[20px]`}>
                    <Categories categories={bookCategories} path='medical-books' />
                </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap lg:col-span-8 col-span-1">
                {
                    data.length !== 0 ? 
                    data?.map(({ name, image, _id, slug,price }) => (
                        <Link key={_id} href={`/medical-books/${slug.current}`}>
                          <div className='flex flex-col items-center mb-[20px] cursor-pointer'>
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
                      )) : (
                        <div className='w-full font-[poppins] flex flex-col justify-center items-center '>
                            <h2 className='p-[10px]'>
                                Can not find books
                            </h2>
                            <button type='button' onClick={()=> {
                                setData(books)
                            }} className='bg-orange-400 px-[20px] py-[10px] rounded'>
                                Go Back to store
                            </button>
                        </div>
                    )

                }
            </div>

        </div>
    )
}

export async function getStaticProps(ctx) {
    const booksQuery = '*[_type == "medical-books"]'

    const books = await client.fetch(booksQuery);
    return {
        props: {
            books
        },
        revalidate: 10,
    }
}

export default Index