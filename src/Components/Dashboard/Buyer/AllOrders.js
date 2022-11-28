import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css';
import toast from 'react-hot-toast'
import DeleteConfirmModal from '../../DeleteConfirmModal/DeleteConfirmModal';
import { useQuery } from '@tanstack/react-query'




const AllOrders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([]);
    const [deletingOrder, setDeletingOrder] = useState(null);

    const closeModal = () => {
        setDeletingOrder(null);
    }
    const handleDeleteOrder = order => {
        console.log(order._id)
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${order.productName} deleted successfully`)
                }
            })
    }
    // useEffect(() => {
    //     fetch(`http://localhost:5000/orders/${user?.email}`, {
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setOrders(data.data)
    //         })
    // }, [user.email])

    const { data: myorders = [], refetch, isLoading } = useQuery({
        queryKey: ['myorders'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/orders/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    console.log(orders)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Booking Time</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myorders?.map((order, i) =>
                                <tr
                                    setDeletingOrder={setDeletingOrder}
                                    key={i}
                                >
                                    <th>{i + 1}</th>
                                    <td>
                                        <PhotoProvider>
                                            <PhotoView src={order.image}>
                                                <img className=' w-32' src={order.image} alt="" />
                                            </PhotoView>
                                        </PhotoProvider>
                                    </td>
                                    <td>{order.productName}</td>
                                    <td>{order.price}</td>
                                    <td>{order.orderTime}</td>
                                    <td><button className='btn btn-primary'>Buy Now</button></td>
                                    <td><label htmlFor="confirmation-modal" onClick={() => setDeletingOrder(order)} className='btn btn-circle'>X</label></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    deletingOrder && <DeleteConfirmModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deletingOrder.productName}. It cannot be undone.`}
                        successAction={handleDeleteOrder}
                        successButtonName="Delete"
                        modalData={deletingOrder}
                        closeModal={closeModal}
                    >
                    </DeleteConfirmModal>
                }
            </div>
        </div>
    );
};

export default AllOrders;