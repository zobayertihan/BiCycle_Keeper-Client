import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import { AiFillDelete } from "react-icons/ai";


const AllBuyer = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer, setIsBuyer] = useState([]);

    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const closeModal = () => {
        setDeletingBuyer(null);
    }

    const { data: allbuyer = [], refetch, isLoading } = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async () => {
            const res = await fetch('https://bikeserver.vercel.app/users/allbuyer');
            const data = await res.json();
            return data;
        }
    });
    const handleDeleteBuyer = buyer => {
        fetch(`https://bikeserver.vercel.app/users/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${buyer.name} deleted successfully`)
                }
            })
    }
    // useEffect(() => {
    //     fetch(`https://bikeserver.vercel.app/users/allbuyer`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setIsBuyer(data);
    //         })
    // }, [user.email])
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
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allbuyer.map((buyer, i) =>
                                <tr
                                    key={i}
                                    setDeletingBuyer={setDeletingBuyer}
                                >
                                    <th>{i + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    < td > <label htmlFor='confirmation-modal' onClick={() => setDeletingBuyer(buyer)} className='btn btn-ghost text-2xl text-red-500'><AiFillDelete className='mx-1 w-5 h-12' /></label></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    deletingBuyer && <DeleteConfirmModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
                        successAction={handleDeleteBuyer}
                        successButtonName="Delete"
                        modalData={deletingBuyer}
                        closeModal={closeModal}
                    >
                    </DeleteConfirmModal>
                }
            </div>
        </div>
    );
};

export default AllBuyer;