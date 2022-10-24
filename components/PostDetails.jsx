import React, { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { urlFor } from '../lib/client';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
import { useStateContext } from '../context/StateContext'

const PostDetail = ({ post }) => {

  const router = useRouter();

  const { user } = useStateContext();

  const [triggerDelete, setTriggerDelete] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [editTrigger, setEditTrigger] = useState(false)
  const [popup, setPopup] = useState(false)

  const handleEdit = () => {
    router.push({
      pathname: `/blog/write`,
      query: {
        slug: post.slug.current
      }
    })
  }

  const handleDelete = async () => {
    await axios.delete(`/api/blog/${post._id}`);

    console.log('Post Deleted');
  }

  return (
    <>
      {
        popup && (
          <div className='cart-wrapper'>
          </div>
        )
      }

      {
        triggerDelete ?
          (
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-300 z-10 p-[20px] rounded font-medium text-xl z-[200]'>
              <p>Do you want to Delete this post?</p>
              <div className='flex gap-[10px] justify-center mt-[10px]'>
                <button type='button'
                  onClick={() => {
                    setPopup(false);
                    setTriggerDelete(false)
                  }}
                  className='px-[20px] py-[8px] bg-red-400'>No</button>
                <button type='button'
                  onClick={handleDelete}
                  className='px-[20px] py-[8px] bg-red-400'>Yes</button>
              </div>
            </div>
          ) :
          editTrigger ?
            (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-300 z-10 p-[20px] rounded font-medium text-xl z-[200]'>
                <p>Do you want to Edit this post?</p>
                <div className='flex gap-[10px] justify-center mt-[10px]'>
                  <button type='button'
                    onClick={() => {
                      setPopup(false);
                      setEditTrigger(false)
                    }}
                    className='px-[20px] py-[8px] border-2 border-orange-400 rounded-2xl'>No</button>
                  <button type='button'
                    onClick={handleEdit}
                    className='px-[20px] py-[8px] bg-orange-400 rounded-2xl'>Yes</button>
                </div>
              </div>
            ) : null
      }


      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 mt-[20px]">
        <div className="relative overflow-hidden shadow-md mb-6 rounded bg-orange-300">
          <img src={urlFor(post.image).url()} alt="" className="object-top h-72 w-full object-contain  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.createdBy}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={urlFor(post.creatorImage).url()}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.createdBy}</p>
            </div>
            <div className="w-full flex justify-between font-medium text-gray-700">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
              </div>

              {/* ..... Edit and Delete ..... */}

              {
                (user && user?.email === 'medisewa7@gmail.com') && (
                  <div className='flex gap-[15px]'>
                    <div className='bg-teal-300 p-[10px] rounded-full cursor-pointer'
                      onClick={() => {
                        setEditTrigger(true);
                        setPopup(true)
                      }}>
                      <FiEdit2 />
                    </div>
                    <div className='bg-orange-300 p-[10px] rounded-full cursor-pointer'
                      onClick={() => {
                        setTriggerDelete(true);
                        setPopup(true)
                      }}>
                      <MdOutlineDelete />
                    </div>
                  </div>
                )
              }

            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          <div className='font-[poppins]'>
            {post?.description.replace(/<[^>]+>/g, '')}
          </div>
        </div>
      </div>

    </>
  );
};

export default PostDetail;