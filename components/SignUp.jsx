import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from './Loader';

const SignUp = () => {

    const router = useRouter();

    const { addUser } = useStateContext();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [processing, setProcessing] = useState(false)

    const handleSignup = async () => {

        if (userName && email && password && confirmPassword) {
            setProcessing(true);
            const doc = {
                _type: 'user',
                userName,
                email,
                password
            }
            try {
                const response = await axios.post(`/api/auth/signup`, doc)
                if (response.status === 201) {
                    const { userName, email, _id } = response.data;
                    addUser({
                        _id,
                        _type: 'user',
                        email,
                        userName,
                        image: "",
                    })
                }
                setProcessing(false);
                toast.success(`acount created successfully`);
                router.push('/');

            }

            catch (error) {
                setProcessing(false);
                if (error.response.status === 403) {
                    toast.error(`User Already Exists`);
                    return;
                }
                else {
                    toast.error(`Something went wrong`);
                }
            }
        }
        else {
            toast.error(`Please fill all the fields.`);
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='relative w-[30rem] h-[30rem] mt-[30px] flex justify-center p-[30px] shadow-2xl rounded'>
                <div className='absolute left-0 top-0'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-orange-500 '></div>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-orange-500 ml-[3rem] '></div>
                </div>

                <div className='absolute right-0 bottom-0'>
                    <div className='w-[1rem] h-[1rem] rounded-full bg-orange-500 '></div>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-orange-500 ml-[1rem] '></div>
                </div>

                <div className='flex flex-col items-center w-full'>
                    <GoogleLogin
                        onSuccess={(response) => {
                            createOrGetUser(response, addUser)
                            router.push('/')
                        }}
                        onError={() => toast.error('Login Failed')}
                    />
                    <p className='text-center p-[10px] font-bold'>OR</p>

                    <div className='w-full flex flex-col items-center'>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='grow outline-none'
                                onChange={(e) => setUserName(e.target.value)}
                                type='text' placeholder='Enter full name' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" /></svg>
                        </div>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='grow outline-none'
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' placeholder='Enter email' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill='orange' width="24" height="24" viewBox="0 0 24 24"><path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" /></svg>
                        </div>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='outline-none grow'
                                onChange={(e) => setPassword(e.target.value)}
                                type='password' placeholder='Enter password' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-1.293l7.06-7.06c-.214-.26-.413-.533-.599-.815l-6.461 6.461v-2.293l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" /></svg>
                        </div>
                        <div className='w-full md:w-[80%] flex items-center justify-between p-[10px] shadow-lg mb-[10px]'>
                            <input className='outline-none grow'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type='password' placeholder='Confirm password' />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-1.293l7.06-7.06c-.214-.26-.413-.533-.599-.815l-6.461 6.461v-2.293l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z" /></svg>
                        </div>

                        <div className='w-[7rem] h-[3rem] flex items-center justify-center text-center bg-teal-400 py-[10px] px-[20px] my-[10px] font-bold'>
                            {
                                processing ? <Loader /> : (
                                    <button type='button' onClick={handleSignup}>
                                        Sign Up
                                    </button>
                                )
                            }
                        </div>

                    </div>

                    <button type='button' onClick={() => router.push('/user/login')}
                        className='w-[7rem] py-[10px] px-[20px] my-[10px] border-2 border-teal-400 font-bold'>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;