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
        <div>

            {
                user?.email &&
                users?.map(user =>
                    <div key={user._id} className=' border border-solid my-5'>
                        <p>{user.catagory}</p>
                        <p>{user.condition}</p>
                        <p>{user.productName}</p>
                        <p>{user.sellerName}</p>
                    </div>
                )
            }
        </div>
    );
};

export default AllProducts;