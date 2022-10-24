import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Image from 'next/image'

import {blogCategories} from '../../utils/categories'
import { client, urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';

const Write = ({ state }) => {

    const router = useRouter();

    const { user } = useStateContext();

    const [blogDescription, setBlogDescription] = useState(state?.description || "");
    const [loading, setLoading] = useState(false);
    const [blogAsset, setBlogAsset] = useState(null);
    const [creatorAsset, setCreatorAsset] = useState(null);
    const [blogTitle, setBlogTitle] = useState(state?.title || "");
    const [blogCategory, setBlogCategory] = useState(state?.category || "");
    const [creatorName, setCreatorName] = useState(state?.createdBy || "");
    const [savingBlog, setSavingBlog] = useState(false);

    const uploadImage = async (e) => {
        const selectedFile = e.target.files[0];

        // uploading asset to sanity

        try {
            setLoading(true);

            client.assets
                .upload('image', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setBlogAsset(data);
                    setLoading(false);
                });
        }
        catch (e) {
            console.log(e.message)
        }

    };

    const uploadCreatorImage = async (e) => {
        const selectedFile = e.target.files[0];

        // uploading asset to sanity

        try {
            setLoading(true);

            client.assets
                .upload('image', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setCreatorAsset(data);
                    setLoading(false);
                });
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const slugify= (input) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
              

    const handleBlog = async () => {

        if (blogTitle && blogAsset?._id && blogCategory && blogDescription && creatorAsset && creatorName) {
            setSavingBlog(true);

            const doc = {
                _type: 'blog',
                title: blogTitle,
                description: blogDescription,
                slug : {
                    _type: 'slug',
                    current: slugify(blogTitle),
                },
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: blogAsset?._id,
                    },
                },
                category: blogCategory,
                createdBy: creatorName,
                creatorImage: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: creatorAsset?._id,
                    },
                },
            }

            await axios.post(`/api/blog`, doc);
            toast.success(`Post uploaded successfully.`);
            router.push('/blog')
        } else {
            console.log('fill all the details')
        }
    }

    /*..... Handle Update .....*/
    const handleUpdate = async () => {

        if (blogTitle && blogCategory && blogDescription && creatorName) {
            setSavingBlog(true);

            const doc = {
                title: blogTitle,
                description: blogDescription,
                slug : {
                    _type: 'slug',
                    current: slugify(blogTitle),
                },
                category: blogCategory,
                createdBy: creatorName,
            }

            await axios.put(`/api/blog/${state._id}`, doc);

            toast.success(`Post updated successfully.`);
            router.push('/blog')
        } else {
            console.log('fill all the details')
        }
    }

    if (!user){
        router.push('/')
    }

    if(user){
        if(user.email !== 'medisewa7@gmail.com'){
            router.push('/')
        }
    }
    return (
        <div className='flex w-full mt-[50px]'>
            <div className='w-9/12'>
                <input type='text' value={blogTitle} placeholder='Title of blog' onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full p-[10px] shadow-lg mb-[20px]" />
                <div className='h-[20rem] overflow-scroll'>
                    <ReactQuill
                        className='h-full'
                        theme="snow" value={blogDescription} onChange={setBlogDescription} />
                </div>
            </div>

            <div className='p-[20px]'>
                <div className='flex flex-col'>
                    <input className='hidden'
                        type='file' name='file' id='file'
                        onChange={(e) => uploadImage(e)} />
                    <label className='bg-slate-300 px-[15px] py-[10px] w-max mb-[10px]' htmlFor='file'>Upload Image</label>
                    {
                        blogAsset && <Image src={blogAsset?.url} alt='uploaded_image' width={100} height={100} className='rounded mt-[10px]' />
                    }
                </div>

                <div className='flex flex-col p-[10px]'>
                    <h2 className='font-bold'>
                        Categories
                    </h2>

                    {
                        blogCategories.map((item, i) => (
                            <div key={i}>
                                <input type='radio' checked={blogCategory === item.id} name='cat' value={item.id} id={item.id}
                                    onChange={(e) => setBlogCategory(e.target.value)} />
                                <label htmlFor='dental' className='px-[5px]'>{item.name}</label>
                            </div>
                        ))
                    }

                </div>

                <div>
                    <div>
                        <h2 className='font-bold py-[20px]'>
                            Created By
                        </h2>
                        <div className='flex flex-col'>
                            <input className='hidden'
                                type='file' name='profile' id='profile'
                                onChange={(e) => uploadCreatorImage(e)} />
                            <label htmlFor='profile' className='bg-orange-300 px-[15px] py-[10px] w-max mb-[10px]'>Upload Image</label>
                            {
                                creatorAsset && <Image src={creatorAsset?.url} alt='uploaded_image' width={100} height={100} className='rounded mt-[10px]' />
                            }
                        </div>
                        <input className='p-[8px] border-b-4 border-slate-500' type='text' placeholder="Creator's name"
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)} />
                    </div>
                </div>

                {
                    state ?
                        (<button
                            className='px-[15px] py-[10px] bg-teal-400 mt-[20px] font-bold'
                            type='button' onClick={handleUpdate}>
                            Update
                        </button>) :
                        (<button
                            className='px-[15px] py-[10px] bg-teal-400 mt-[20px] font-bold'
                            type='button' onClick={handleBlog}>
                            Upload
                        </button>)
                }
            </div>

        </div>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query
    const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;

    const state = await client.fetch(query);
    return {
        props: {
            state
        }
    }
}

export default Write