import React from 'react';
import ProductCatagory from '../ProductCatagory/ProductCatagory';
import { useQuery } from '@tanstack/react-query'

const ProductCatagories = () => {
    const { data: catagories = [] } = useQuery({
        queryKey: ['catagories'],
        queryFn: () => fetch(`http://localhost:5000/catagories`)
            .then(res => res.json())
    })
    return (
        <div>
            <div className='mt-16 flex flex-col items-center'>
                <h2 className='text-3xl text-teal-600 font-bold'>Our Product Categories</h2>
                <p className='w-3/5 text-center text-gray-600'>Choose your budget product from these category and ride your bike like you've never before.</p>
            </div>
            <div className='grid place-items-center md:max-w-screen-lg md:mx-auto py-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-6'>
                    {
                        catagories?.map(catagory => <ProductCatagory key={catagory._id}
                            catagory={catagory}
                        ></ProductCatagory>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCatagories;