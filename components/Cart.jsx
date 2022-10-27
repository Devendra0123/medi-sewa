import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>Rs.{item.price}</h4>
                </div>
                <div className="flex justify-between">

                  <div className="">
                    <p className="text-center text-red-500" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                      <AiOutlineMinus />
                    </p>
                    <p className="text-center">{item.quantity}</p>
                    <p className="text-center text-green-500" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></p>
                  </div>
                 
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>Rs.{totalPrice}</h3>
            </div>
            <Link href={'/order/shipping-details'} className="w-full flex justify-center mt-[30px]">
              <button type="button" onClick={()=>setShowCart(false)} className="w-80 md:w-96 px-[15px] py-[12px] bg-orange-400 font-medium">
                Place Order
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart