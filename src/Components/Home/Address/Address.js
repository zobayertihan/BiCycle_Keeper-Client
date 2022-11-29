import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';


const Address = () => {
    const container = useRef(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../Assets/24249-girl-on-the-bicycle.json'),
        });
        return () => {
            Lottie.destroy();
        };
    }, [])
    return (
        <section className="text-gray-800">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-center">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl mb-5 font-bold leading-none sm:text-6xl">
                        Our Address
                    </h1>
                    <p>
                        Mirpur,Dhaka, Bangladesh
                    </p>
                    <p>
                        Phone: 01XXXXXXXXX
                    </p>
                    <p>
                        Email: Admin_X@gmail.com
                    </p>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" ref={container}>
                </div>
            </div>
        </section>
    );
};

export default Address;