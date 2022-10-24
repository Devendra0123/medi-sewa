import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

import { googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiMenu3Line } from 'react-icons/ri'

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities, user, removeUser } = useStateContext();

  const [toggle, setToggle] = useState(false);

  return (
    <div className='flex items-center justify-between px-[0px] font-[poppins] md:px-[20px]'>
      <div className='logo-container'>
        <Link href='/'>
          <img
            className='w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] rounded-full cursor-pointer'
            src="./medisewa_logo.jpg"
            alt='logo' />
        </Link>
      </div>
      <div className={`${toggle === true ? 'block' : 'hidden'} absolute h-72 bg-white z-200 rounded-lg shadow-2xl p-[20px] top-[70px] right-[30px] flex flex-col justify-evenly md:flex md:h-max md:relative md:flex-row md:top-0 md:right-0 md:bg-transparent md:items-center md:px-[10px] md:p-0 md:shadow-none`}>


        <div className='relative right-[-20px] top-[-20px] z-1 md:hidden'>
          <div className='absolute right-0 top-0'>
            <div className='w-[3rem] h-[3rem] rounded-full bg-orange-500 ml-[1rem]'></div>
            <div className='w-[1rem] h-[1rem] rounded-full bg-orange-500'></div>
          </div>
        </div>

        <Link href='/product'>
          <p className='cursor-pointer font-medium text-xl text-teal-400 ml-[20px] hover:underline underline-offset-8 decoration-orange-500 transition ease-in-out delay-150 duration-300'>Store</p>
        </Link>

        <Link href='/ebook'>
          <p className='cursor-pointer font-medium text-xl text-teal-400 ml-[20px] hover:underline underline-offset-8 decoration-orange-500 transition ease-in-out delay-150 duration-300'>Ebook</p>
        </Link>

        <Link href='/past-question'>
          <p className='cursor-pointer font-medium text-xl text-teal-400 ml-[20px] hover:underline underline-offset-8 decoration-orange-500 transition ease-in-out delay-150 duration-300'>Past Question</p>
        </Link>

        <Link href='/blog'>
          <p className='cursor-pointer font-medium text-xl text-teal-400 ml-[20px] hover:underline underline-offset-8 decoration-orange-500 transition ease-in-out delay-150 duration-300'>Blog</p>
        </Link>

        <div
          onClick={() => setShowCart(true)}
          className='relative flex items-center pt-[20px] pb-[10px] md:p-0'>
          <button
            className='font-bold text-xl text-teal-400 ml-[20px]'>
            <MdOutlineShoppingCart />
          </button>
          <p className='absolute left-[18px] top-[0px] md:top-[-20px] md:right-[-1px] font-bold text-orange-500 bg-slate-300 w-[1.5rem] h-[1.5rem] rounded-full text-center'>
            {totalQuantities}</p>
        </div>

        {
          user ? (
            <div>
              <div className='flex items-center gap-2 ml-[20px]'>

                {user.image ? (
                  <Link href={`/profile/${user._id}`} className='flex items-center'>
                    <div className='flex items-center'>
                      <Image
                        className='rounded-full cursor-pointer'
                        src={user.image}
                        alt='user'
                        width={40}
                        height={40}
                      />
                    </div>
                  </Link>
                ) : (
                  <p>
                    {user.userName}
                  </p>
                )
                }
                <button
                  type='button'
                  className='flex items-center border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={() => {
                    googleLogout();
                    removeUser();
                  }}
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              </div>
            </div>
          ) :
            <Link href='/user/signup'>
              <button className='transition ease-in-out bg-orange-600 px-[10px] py-[6px] rounded text-white ml-[20px] hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300'>
                Sign Up
              </button>
            </Link>
        }

      </div>

      <div className='md:hidden'>
        <RiMenu3Line onClick={() => setToggle(prev => !prev)} className='font-bold text-2xl text-orange-500 cursor-pointer' />
      </div>

      {showCart && <Cart />}

    </div>
  )
}

export default Navbar