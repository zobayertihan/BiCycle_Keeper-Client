import Lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const container = useRef(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../Assets/91320-404-error-page-animation-with-sky.json'),
        });
        return () => {
            Lottie.destroy();
        };
    }, [])
    return (
        <div className='flex justify-center items-center'>
            <div className='w-7/12'>
                <div className='container' ref={container}>
                </div>
                <div className='text-center text-2xl'><Link to={'/'}>Go to Home</Link></div>
            </div>

        </div>
    );
};

export default ErrorPage;