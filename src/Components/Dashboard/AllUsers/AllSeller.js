import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import toast from 'react-hot-toast'
import VerifyConfirmModal from '../../VerifyConfirmModal/VerifyConfirmModal';


const AllSeller = () => {
    const { user } = useContext(AuthContext);
    const [isSeller, setIsSeller] = useState([]);
    const [verified, setVerified] = useState('no');
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
            const res = await fetch('http://localhost:5000/users/allseller');
            const data = await res.json();
            return data;
        }
    });
    const handleDeleteSeller = seller => {
        fetch(`http://localhost:5000/users/${seller._id}`, {
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
        fetch(`http://localhost:5000/users/seller/${seller._id}`, {
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

    return (
        <div>
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
                                        <label className={seller?.status === true ? 'text-green-500' : 'text-red-500'}>
                                            {
                                                seller?.status === true ? 'Veryfied' : <label htmlFor='confirmation-modal' onClick={() => setVerifySeller(seller)} className='btn btn-circle'>Verify</label>
                                            }
                                        </label></td>
                                    < td > <label htmlFor='confirmation-modal' onClick={() => setDeletingSeller(seller)} className='btn btn-circle'>X</label></td>
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