import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Categories, Product } from '../../components';
import { client } from '../../lib/client';
import { productCategories } from '../../utils/categories';
import { IoMdSearch } from 'react-icons/io';
import {BsThreeDots} from 'react-icons/bs';

const Index = ({ products }) => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (searchTerm !== '') {
          setLoading(true);
          const items = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.categories[0].toLowerCase().includes(searchTerm.toLowerCase()) || item.details.toLowerCase().includes(searchTerm.toLowerCase()))
          if(items.length !== 0){
              setData(items);
              return;
          }
        } else {
          
            setData(products);
            setLoading(false);
        
        }
      }, [searchTerm]);

    useEffect(() => {
        setToggle(false)
        const category = router.query.category;
        const subCategory = router.query.subcategory;
        if(category && subCategory){
            const items = products?.filter(item => item?.categories[0] === category && item?.subCategories[0] === subCategory);
            items ? setData(items) : setData([]) ;
            return;
        }
        if (category && !subCategory) {
            const items = products?.filter(item => item.categories[0] === category);
            items ? setData(items) : setData([]);
            return;
        } else {
            setData(products)
        }
    }, [router.query.category,router.query.subcategory])

    return (
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
                onClick={()=> setToggle(prev => !prev)}>
                    <BsThreeDots />
                </div>
                <div className={`${toggle ? 'block absolute top-[50px] md:top-[70px] right-[10px] z-10' : 'hidden'} lg:block lg:sticky md:relative md:top-[20px]`}>
                    <Categories categories={productCategories} path='product' />
                </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap lg:col-span-8 col-span-1">
                {
                    data.length !== 0 ? 
                    data?.map((item, index) => (
                        <div key={index}>
                            <Product product={item} />
                        </div>
                    )) : (
                        <div className='w-full font-[poppins] flex flex-col justify-center items-center '>
                            <h2 className='p-[10px]'>
                                Can not find products
                            </h2>
                            <button type='button' onClick={()=> {
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
    )
}

export async function getStaticProps(ctx) {
    const productsQuery = '*[_type == "product"]'

    const products = await client.fetch(productsQuery);
    return {
        props: {
            products
        },
        revalidate: 10,
    }
}

export default Index