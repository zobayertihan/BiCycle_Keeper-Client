import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Contexts/AuthProvider';
import UseTitle from '../../Hooks/Usetitle';
import toast from 'react-hot-toast'
import Loading from '../../Loading/Loading';
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import AdvertisementModal from '../../Modal/AdvertisementModal/AdvertisementModal';
import { AiFillDelete } from "react-icons/ai";


const AllProducts = () => {
    UseTitle('My Products');
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [makeAdvertisement, setAdvertisement] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }
    const closeAdModal = () => {
        setAdvertisement(null);
    }

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://bikeserver.vercel.app/products/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data.data;
            }
            catch (error) {

            }
        }
    });

    const handleAdvertisement = product => {
        const adInfo = {
            productId: product._id,
            productName: product.productName,
            image: product.image,
            newPrice: product.resalePrice,
            condition: product.condition,
            catagory: product.catagory
        }

        fetch(`https://bikeserver.vercel.app/advertisements`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(adInfo)
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success(`${product.productName} published successfully`);
                }
            })
    }

    const handleDeleteProduct = product => {
        fetch(`https://bikeserver.vercel.app/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.productName} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(products)
    return (
        <div className='md:max-w-screen-md mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-md'>
            <table className="w-full text-sm text-left text-gray-300 ">
                <thead className="text-xs text-gray-800 uppercase bg-gray-400 border-b border-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-8">
                            Advirtisement
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => <tr
                            key={product._id}
                            product={product}
                            setDeletingProduct={setDeletingProduct}
                            setAdvertisement={setAdvertisement}
                            className=" border-b bg-gray-200 border-gray-500">
                            <th scope="row" className="flex items-center py-4 px-4 pr-12 text-gray-900 whitespace-nowrap dark:text-black">
                                <img className="w-10 h-10 rounded-full" src={product.image} alt="" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">{product.productName}</div>
                                    <div className="font-normal text-gray-800">{product.category}</div>
                                </div>
                            </th>
                            <td className="py-4 px-10">
                                <label onClick={() => setAdvertisement(product)} htmlFor="confirmation-modal" title='Make Advertisement' className="text-gray-800 text-sm font-medium bg-amber-400 px-2 py-1 rounded-lg hover:text-gray-800 hover:bg-amber-600">Make Ad</label>
                            </td>
                            <td className="py-4 px-6">
                                <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" title='Delete Product' className="text-2xl text-red-500"><AiFillDelete className='mx-4' /></label>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            {
                deletingProduct && <DeleteConfirmModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                >
                </DeleteConfirmModal>
            }
            {
                makeAdvertisement && <AdvertisementModal
                    title={`Are you sure you want to procced?`}
                    message={`Do want to add ${makeAdvertisement.productName} as ad?`}
                    successAction={handleAdvertisement}
                    uccessButtonName="Confirm"
                    modalData={makeAdvertisement}
                    closeModal={closeAdModal}
                >
                </AdvertisementModal>
            }
        </div>



    );

};

export default AllProducts;