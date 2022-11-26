import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Contexts/AuthProvider';


const AllProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`http://localhost:5000/products/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                return data.data
            })
    })
    console.log(users);
    return (
        <div className=''>

            {
                user?.email &&
                users?.map(user =>
                    <div key={user._id} className="card my-12 max-w-screen-md mx-auto bg-base-100 shadow-xl">
                        <figure><img className='cover' src={user.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{user.productName}</h2>
                            <div className='grid grid-cols-2'>
                                <p>Seller Name: {user.sellerName}</p>
                                <p>{user.isVerified ? 'verified' : ''}</p>
                            </div>
                            <div className='grid grid-cols-2'>
                                <p>Phone: {user.phone}</p>
                                <p>Location: {user.location}</p>
                                <p>Original Price: {user.originalPrice}</p>
                                <p>Resale Price: {user.resalePrice}</p>
                                <p>Condition: {user.condition}</p>
                                <p>Post Time:{user.postTime}</p>
                            </div>
                            <p>{user.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AllProducts;