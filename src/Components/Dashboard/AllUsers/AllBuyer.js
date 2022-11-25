import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const AllBuyer = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer, setIsBuyer] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/users/allbuyer`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsBuyer(data);
            })
    }, [user.email])
    return (
        <div>  <div className="overflow-x-auto">
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
                        isBuyer.map((buyer, i) =>
                            <tr>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
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

export default AllBuyer;