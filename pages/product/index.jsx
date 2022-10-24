import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Categories, Product } from '../../components';
import { client } from '../../lib/client';
import { productCategories } from '../../utils/categories';
import {searchQuery} from '../../utils/query'
import { IoMdSearch } from 'react-icons/io';

const index = ({ products }) => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm !== '') {
          setLoading(true);
          const query = searchQuery(searchTerm.toLowerCase());
          client.fetch(query).then((data) => {
            setData(data);
            setLoading(false);
          });
        } else {
          
            setData(products);
            setLoading(false);
        
        }
      }, [searchTerm]);

    useEffect(() => {
        const category = router.query.category
        if (category) {
            const items = products?.filter(item => item.categories[0] === category);
            items ? setData(items) : setData([])
        } else {
            setData(products)
        }
    }, [router.query.category])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[30px]">

            <div className="lg:col-span-3 col-span-1">
                <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-2 border-orange-300 outline-none shadow-xl">
                    <IoMdSearch fontSize={21} className="ml-1" />
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        value={searchTerm}
                        className="p-2 w-full bg-white outline-none"
                    />
                </div>
                <div className="lg:sticky relative top-[20px]">
                    <Categories categories={productCategories} path='product' />
                </div>
            </div>

            <div className="flex flex-wrap lg:col-span-8 col-span-1">
                {
                    data.length !== 0 ? 
                    data?.map((item, index) => (
                        <div key={index}>
                            <Product product={item} />
                        </div>
                    )) : (
                        <div className='w-full font-[poppins] flex flex-col justify-center items-center '>
                            <h2 className='p-[10px]'>
                                Can't find products
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

export default index