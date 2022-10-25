import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import type { ProductType } from '../type';
import { urlFor } from '../lib/client';
import {useStateContext} from '../context/StateContext';

type Props = {
  product: ProductType
}

const Product: React.FC<Props> = ({ product }) => {

  const src = urlFor(product.image[0] && product.image[0]).url();

  const {onAdd} = useStateContext();

  const addToCart = (event : any)=>{
    console.log(product)
    event.stopPropagation();
    onAdd(product,1);
  }
  return (
    <div className='products-container'>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <div className='relative flex flex-col items-center'>
            <Image
              src={src}
              width={140}
              height={140}
              className="product-image"
            />
            <p className="product-name">{product.name}</p>
            <p className="product-price">Rs.{product.price}</p>
            <p className='text-center'>
              {product?.details?.length > 40 ? product.details.slice(0,40) + '...' : product.details}
            </p>
            <button type='button' onClick={addToCart} className='bg-cyan-600 px-[10px] py-[6px] rounded text-white mt-[10px] hover:bg-teal-500'>
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product