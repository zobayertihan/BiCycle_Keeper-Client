import React from 'react';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css';

const ProductCatagory = ({ catagory }) => {
    const { _id, image, catagoryName, details } = catagory;

    return (
        <div className="max-w-sm rounded-md shadow-md text-black">
            <PhotoProvider>
                <PhotoView src={image} >
                    <img src={image} alt="" className="object-cover object-center w-full rounded-t-md dark:bg-gray-500" />
                </PhotoView>
            </PhotoProvider>
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold tracking-wide">{catagoryName}</h2>
                    <p className="text-sm text-black">{details.slice(0, 250)}...</p>
                </div>
                <div className=''>
                    <Link to={`/catagory/${catagoryName}`} className="flex items-center justify-center w-full p-3 font-semibold rounded-md outline outline-1 hover:bg-gray-300 transition ease-in duration-200 text-black">View</Link>
                </div>
            </div>

        </div>
    );
};

export default ProductCatagory;