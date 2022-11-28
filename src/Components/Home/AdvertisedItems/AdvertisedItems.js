import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const AdvertisedItems = () => {
    const { data: advertisements = [], isLoading } = useQuery({
        queryKey: ['advertisements'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertisements');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading ></Loading>
    }
    return (
        <div>
            {
                advertisements?.slice(0, 1).map(advertisement => <div
                    key={advertisement._id}
                    advertisement={advertisement}
                    className="mx-auto py-9 md:py-12 px-4 md:px-6">
                    <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
                        <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
                            <div className="flex flex-col justify-center md:w-1/2">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">Best Deal</h1>
                                    <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">Buy your <span className="font-bold">{advertisement.productName}</span></p>
                                    <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">Only at <span className="font-bold">{advertisement.newPrice} Taka</span></p>
                                </div>
                                <div className='my-4'>
                                    <Link to={`/category/${advertisement?.category}`} className='text-white font-medium bg-black p-2 rounded-md'>Buy Now</Link>
                                </div>
                            </div>

                            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
                                <img src={advertisement.image} alt="" className="rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    );
};

export default AdvertisedItems;
