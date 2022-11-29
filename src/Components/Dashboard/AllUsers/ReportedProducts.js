import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import UseTitle from '../../Hooks/Usetitle';
import Loading from '../../Loading/Loading';


const ReportedProducts = () => {
    UseTitle('Reports');
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: reports = [], refetch, isLoading } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await fetch('https://bikeserver.vercel.app/reports');
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteProduct = products => {
        console.log(products)
        fetch(`https://bikeserver.vercel.app/products/${products.productId}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                }
            })

        fetch(`https://bikeserver.vercel.app/reported-products/${products._id}`, {
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
                    toast.success(`${products.productName} deleted successfully`)
                }
            })
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="md:max-w-screen-md mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-md">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-900 uppercase bg-gray-400 bordrt-b border-gray-500">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Reporter
                        </th>
                        <th scope="col" className="py-3 px-16">
                            Product
                        </th>
                        <th scope="col" className="py-3 px-12">
                            Seller
                        </th>
                        <th scope="col" className="py-3 px-7">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reports?.map(report =>
                            <tr
                                key={report._id}
                                report={report}
                                setDeletingProduct={setDeletingProduct}
                                className=" border-b bg-gray-200 border-gray-500">
                                <th scope="row" className="flex items-center py-4 px-4 text-black whitespace-nowrap">
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{report.user}</div>
                                        <div className="font-normal text-gray-900">{report.email}</div>
                                    </div>
                                </th>
                                <td className="py-4 px-6">
                                    <div className="text-base text-gray-900 font-semibold">{report.productName}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-base text-gray-900 font-semibold">{report.productSellerMail}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className='flex'>
                                        <label onClick={() => setDeletingProduct(report)} htmlFor="confirmation-modal" title='Delete Product' className="text-2xl text-red-500"><AiFillDelete className='mx-4' /></label>
                                    </div>
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
        </div>
    );
};

export default ReportedProducts;