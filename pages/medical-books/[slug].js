import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const BookDetails = ({ books, book }) => {

    const { image, name, description, author, publication, price } = book;
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }
    return (
        <div className='mt-[30px]'>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex justify-center w-full lg:mr-[30px]'>
                    <img src={urlFor(image[0] && image[0]).url()} className="product-detail-image" />
                </div>
                <div className="product-detail-desc">
                    <h2 className='font-bold text-xl'>
                        {name}
                    </h2>
                    <p className='font-[poppins] py-[10px]'>
                        {description}
                    </p>
                    <p className="price">Rs.{price}</p>
                    <p className='font-[poppins] py-[5px]'>
                        Author : {author}
                    </p>
                    <p className='font-[poppins] py-[5px]'>
                        Publication: {publication}
                    </p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="flex items-center">
                            <span className="w-[2rem] h-[2rem] p-[6px] bg-orange-300 text-center" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="w-[2rem] h-[2rem] p-[6px] bg-slate-300 text-center">{qty}</span>
                            <span className="w-[2rem] h-[2rem] p-[6px] bg-orange-300 text-center" onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div>
                <div className="maylike-products-wrapper">
                    <h2 className='font-bold font-[poppins] text-center text-lg'>You may like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {books?.map(({ name, image, _id, slug }) => (
                                <Link key={_id} href={`/book/${slug.current}`}>
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src={urlFor(image[0] && image[0]).url()}
                                            width={150}
                                            height={200}
                                            className="rounded"
                                        />
                                        <p className='font-[poppins] w-[15rem] text-center'>
                                            {name.length > 15 ? name.slice(0, 15) + '...' : name}
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
    const query = `*[_type == "medical-books"] {
      slug {
        current
      }
    }
    `;

    const books = await client.fetch(query);

    const paths = books.map((item) => ({
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
    const query = `*[_type == "medical-books" && slug.current == '${slug}'][0] {
        name,
        image,
        description,
        author,
        publication,
        price
      }`;
    const booksQuery = '*[_type == "medical-books"]'

    const book = await client.fetch(query);
    const books = await client.fetch(booksQuery);
    console.log(book)

    return {
        props: { book, books }
    }
}

export default BookDetails