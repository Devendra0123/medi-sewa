import React, { useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Loader from './Loader';
const ShippingDetails = () => {
  const router = useRouter();
  const { totalQuantities, totalPrice, cartItems } = useStateContext();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [processing, setProcessing] = useState(false)

  const handleOrder = async () => {
    if (customerName && email && location && contactNumber) {
      setProcessing(true);
      const doc = {
        _type: 'order',
        shippingDetails: {
          customerName,
          email,
          location,
          contactNumber: parseInt(contactNumber)
        },
        totalQuantity: totalQuantities,
        totalPrice: totalPrice,
        items: cartItems.map(item => {
          return {
            _key: item._rev,
            productName: item.name,
            productPrice: item.price,
            oldOrNew: item.newOrOld[0],
            productQuantity: item.quantity
          }
        })
      }
      try {
        await axios.post(`/api/order`, doc);
        setProcessing(false);
        toast.success(`Order Successful`);
        router.push('/order');
      }
      catch (error) {
        setProcessing(false);
        toast.error('Something went wrong')
      }
    } else {
      console.log('fill all the details')
    }
  }

  return (
    <div className='flex justify-center mt-[50px]'>
      <div className='w-[30rem] h-[27rem] flex flex-col items-center shadow-lg rounded'>
        <h2 className='w-full bg-orange-300 text-center p-[15px] font-bold'>
          Shipping Details
        </h2>
        <div className='w-full flex flex-col items-center mt-[20px]'>
          <div className='w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
            <input className='grow outline-none'
              onChange={(e) => setCustomerName(e.target.value)}
              type='text' placeholder='Enter full name' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" /></svg>
          </div>

          <div className='w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
            <input className='grow outline-none'
              onChange={(e) => setEmail(e.target.value)}
              type='email' placeholder='Enter email' />
            <svg xmlns="http://www.w3.org/2000/svg" fill='orange' width="24" height="24" viewBox="0 0 24 24"><path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" /></svg>
          </div>

          <div className='w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
            <input className='grow outline-none'
              onChange={(e) => setLocation(e.target.value)}
              type='text' placeholder='Enter Location' />
            <svg width="24" height="24" fill='orange' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" /></svg>
          </div>

          <div className='w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
            <input className='grow outline-none'
              onChange={(e) => setContactNumber(e.target.value)}
              type='number' placeholder='Enter Contact Number' />
            <svg width="24" height="24" fill='orange' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376" /></svg>
          </div>

          <p className='font-[poppins] p-[10px]'>
            Check your details carefully.
          </p>
        </div>
        <div className='w-[20rem] h-[3rem] flex items-center justify-center text-center bg-teal-400 py-[10px] px-[20px] my-[10px] font-bold'>
          {
            processing ? <Loader /> : (
              <button type='button' onClick={handleOrder}>
                Confirm Order
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails