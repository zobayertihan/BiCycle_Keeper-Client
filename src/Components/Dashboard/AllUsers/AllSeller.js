import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const AllSeller = () => {
    const { user } = useContext(AuthContext);
    const [isSeller, setIsSeller] = useState([]);
    const [verified, setVerified] = useState('no');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/users/allseller`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsSeller(data);
            })
    }, [user.email]);

    const seller = isSeller.filter(s => s.email === user?.email)


    const handleVerify = (id) => {
        const updateDate = {
            isVerified: "yes"
        }
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updateDate)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    navigate('/dashboard/allseller')
                }
            })
    }

    const handleRemove = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(seller)
                const remaining = seller.filter(s => s._id !== id)
                console.log(remaining)
                setIsSeller(remaining)
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
                            isSeller.map((seller, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td><button className='btn btn-primary' onClick={() => handleVerify(seller._id)}>Verify</button></td>
                                    <td><button onClick={() => handleRemove(seller._id)} className='btn btn-circle'>X</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;