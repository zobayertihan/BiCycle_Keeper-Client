import React from 'react';

const Banner = () => {
    return (
        <div className="hero h-[450px]" style={{ backgroundImage: `url("https://i.ibb.co/jHf29TQ/bcycle.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className=" text-gray-100 mb-5 text-5xl font-bold">BiCycle Keeper</h1>
                    <p className="text-gray-100 mb-5 text-xl">We try to provide the best products for our customers.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;