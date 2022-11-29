import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import toast from 'react-hot-toast'
import VerifyConfirmModal from '../../VerifyConfirmModal/VerifyConfirmModal';
import Loading from '../../Loading/Loading';
import { AiFillDelete } from "react-icons/ai";


const AllSeller = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [deletingSeller, setDeletingSeller] = useState(null);
    const [verifySeller, setVerifySeller] = useState(null);

    const closeVerifyModal = () => {
        setVerifySeller(null);
    }
    const closeModal = () => {
        setDeletingSeller(null);
    }

    const { data: allseller = [], refetch, isLoading } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch('https://bikeserver.vercel.app/users/allseller');
            const data = await res.json();
            return data;
        }
    });
    const handleDeleteSeller = seller => {
        fetch(`https://bikeserver.vercel.app/users/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${seller.name} deleted successfully`)
                }
            })
    }
    const handleVerifySeller = seller => {
        fetch(`https://bikeserver.vercel.app/users/seller/${seller._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success(`${seller.name} veryfied successfully`);
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='md:max-w-screen-md mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-md'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allseller.map((seller, i) =>
                                < tr
                                    key={seller._id}
                                    setDeletingSeller={setDeletingSeller}
                                >
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    < td >
                                        <label className={seller?.status === true ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                                            {
                                                seller?.status === 'Veryfied' ? 'Veryfied' : <label htmlFor='confirmation-modal' onClick={() => setVerifySeller(seller)} className='btn bg-white text-black hover:bg-black hover:text-white'>Verify</label>
                                            }
                                        </label></td>
                                    < td > <label htmlFor='confirmation-modal' onClick={() => setDeletingSeller(seller)} className='btn btn-ghost text-2xl text-red-500'><AiFillDelete className='mx-1 w-5 h-12' /></label></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    deletingSeller && <DeleteConfirmModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
                        successAction={handleDeleteSeller}
                        successButtonName="Delete"
                        modalData={deletingSeller}
                        closeModal={closeModal}
                    >
                    </DeleteConfirmModal>
                }
                {
                    verifySeller && <VerifyConfirmModal
                        title={`Do you want to procced?`}
                        message={`${verifySeller.name} will be a verified seller.`}
                        successAction={handleVerifySeller}
                        successButtonName="Verify"
                        modalData={verifySeller}
                        closeModal={closeVerifyModal}
                    >
                    </VerifyConfirmModal>
                }
            </div >
        </div >
    );
};

export default AllSeller;