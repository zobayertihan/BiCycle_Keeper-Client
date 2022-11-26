import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css';

const AllOrders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data.data)
            })
    }, [user.email])
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
                            orders.map((order, i) =>
                                <tr>
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
                                    <td><button className='btn btn-circle'>X</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;