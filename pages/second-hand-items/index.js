import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Categories, Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import { secondHandCategories } from '../../utils/categories';
import { IoMdSearch } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';
import {BsThreeDots} from 'react-icons/bs';

const Index = ({ products, books }) => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [itemCategory, setItemCategory] = useState('');
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            const items = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.categories[0].toLowerCase().includes(searchTerm.toLowerCase()) || item.details.toLowerCase().includes(searchTerm.toLowerCase()))
            if (items.length !== 0) {
                setItemCategory('products')
                setData(items);
                return;
            }

            const bookiItems = books.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.categories[0].toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            if (bookiItems.length !== 0) {
                setItemCategory('books')
                setData(bookiItems);
                return;
            }
        } else {
            setItemCategory('')
            setData(products);
            setLoading(false);

        }
    }, [searchTerm]);


    useEffect(() => {
        setToggle(false)
        const category = router.query.category;

        if (category === 'second-hand-products') {
            setItemCategory('products')
            setData(products)
            return;
        }
        if (category === 'second-hand-books') {
            setItemCategory('books')
            setData(books)
            return;
        } else {
            setData(products)
        }
    }, [router.query.category, router.query.subcategory]);

    return (
        <div className='mt-[20px]'>
            <h2 className='text-center font-bold text-lg font-[poppins] p-[10px]'>
                Second Hand Marketplace
            </h2>
            <p className="text-center px-[10px] font-medium text-xl font-['lobster'] text-orange-500">
                Do you want to sell second hand products? Contact Us.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[30px]">

                <div className="relative flex flex-row lg:flex-col justify-between lg:justify-start lg:col-span-3 col-span-1 px-[10px]">
                    <div className="flex justify-start items-center w-3/5 lg:w-full h-12 px-2 rounded-md bg-white border-2 border-orange-300 outline-none shadow-xl">
                        <IoMdSearch fontSize={21} className="ml-1" />
                        <input
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            value={searchTerm}
                            className="p-2 w-full bg-white outline-none"
                        />
                    </div>
                    <div
                        className='block lg:hidden absolute top-[0px] right-[10px] bg-slate-300 h-[3rem] w-[3rem] rounded-full flex items-center justify-center font-bold text-2xl'
                        onClick={() => setToggle(prev => !prev)}>
                        <BsThreeDots />
                    </div>
                    <div className={`${toggle ? 'block absolute top-[50px] md:top-[70px] right-[10px] z-10' : 'hidden'} lg:block lg:sticky md:relative md:top-[20px]`}>
                        <Categories categories={secondHandCategories} path='second-hand-items' />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap lg:col-span-8 col-span-1">
                    {
                        data?.length !== 0 && itemCategory === 'books' ?
                            data?.map(({ name, image, _id, slug, price }) => (
                                <Link key={_id} href={`/medical-books/${slug.current}`}>
                                    <div className='flex flex-col items-center mb-[20px]'>
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
                                            {name.length > 15 ? name.slice(0, 15) + '...' : name}
                                        </p>
                                    </div>
                                </Link>
                            )) :
                            data?.length !== 0 ?
                                data?.map((item, index) => (
                                    <div key={index}>
                                        <Product product={item} />
                                    </div>
                                )) :
                                (
                                    <div className='w-full font-[poppins] flex flex-col justify-center items-center '>
                                        <h2 className='p-[10px]'>
                                            Can not find products
                                        </h2>
                                        <button type='button' onClick={() => {
                                            setSearchTerm('');
                                            setData(products)
                                        }} className='bg-orange-400 px-[20px] py-[10px] rounded'>
                                            Go Back to store
                                        </button>
                                    </div>
                                )

                    }
                </div>

            </div>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const productsQuery = '*[_type == "product"]'
    const booksQuery = '*[_type == "medical-books"]'
    const productsData = await client.fetch(productsQuery);
    const booksData = await client.fetch(booksQuery);

    const products = productsData?.filter(item => item.newOrOld[0] === 'old')
    const books = booksData?.filter(item => item.newOrOld[0] === 'old')

    return {
        props: {
            products, books
        },
        revalidate: 10,
    }
}

export default Index