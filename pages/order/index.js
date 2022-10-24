import React from 'react'

const index = () => {
  return (
    <div className='flex justify-center mt-[50px]'>
        <div className='w-[35rem] flex flex-col font-[poppins] font-medum text-center shadow-xl p-[20px]'>
            <p className='text-green-600 text-lg'>
                Your order has been placed successfully.
                <span>We will contact you soon.</span>
            </p>
            <p className='mt-[15px]'>
                For any query, contact us at:
            </p>
            <div>
                <p>medisewa7@gmail.com</p>
                <p>9861898195, 9840355701</p>
            </div>
        </div>
    </div>
  )
}

export default index