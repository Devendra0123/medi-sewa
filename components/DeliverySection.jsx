import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

const DeliverySection = () => {

    const videoRef = useRef(null);

    const [domLoaded, setDomLoaded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [position, setPosition] = useState(200);

    useEffect(() => {
        setDomLoaded(true);

        const onScroll = () => {
            setOffset(window.pageYOffset);
            const yPosition = document.getElementById("deliverySection")?.offsetTop;
            setPosition(yPosition);
        }    
        window.addEventListener('scroll', onScroll, { passive: true });
       
    }, []);

    if (offset > position - 200) {
        videoRef?.current?.play();
    } else {
        if (videoRef?.current?.play) {
            videoRef?.current?.pause();
        }
    }
    return (
        <div id='deliverySection' className="w-full flex justify-center mt-[70px]">
            <div className='bg-[#ebebeb] w-[80%] flex items-center justify-evenly p-[20px] rounded-xl'>
                <div>
                    <h2 className="font-['lobster'] text-orange-500 font-bold text-2xl tracking-wider">Delivery</h2>
                    <p className="font-['poppins'] text-xl">
                        We deliver all the products faster <br /> than any other company with <br /> good packaging.
                    </p>
                    <Link href='/product'>
                        <button className='bg-cyan-400 py-[6px] px-[15px] rounded mt-[15px]'>
                            Shop now
                        </button>
                    </Link>
                </div>

                <div className='rounded-xl'>
                    {
                        domLoaded && (
                            <div>
                                <video
                                    ref={videoRef}
                                    controls
                                    muted="muted"
                                    width="420" height="340"
                                    loop
                                    src={'/deliveryvideo.mp4'}
                                    className='rounded-xl cursor-pointer'
                                ></video>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default DeliverySection