import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';

const Products = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { catagory } = useParams();
    const [catagories, setCatagories] = useState([]);
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const orderTime = `${date} ${time}`
    useEffect(() => {
        fetch(`http://localhost:5000/catagory/${catagory}`)
            .then(res => res.json())
            .then(data => {
                setCatagories(data.data)
            })
    }, [catagory])
    const hadleBookNow = (image, productName, price) => {
        const order = {
            name: user.displayName,
            email: user.email,
            image,
            productName,
            price,
            orderTime,
            phone,
            location
        }
        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/dashboard/allorders')
                toast.success('Booking Confirmed')
            })
    }
    return (
        <div className='mt-10'>
            {
                catagories.map(cata =>
                    <div key={cata._id} className="card my-12 max-w-screen-md mx-auto bg-base-100 shadow-xl">
                        <figure><img className='cover' src={cata.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{cata.productName}</h2>
                            <div className='grid grid-cols-2'>
                                <p>Seller Name: {cata.sellerName}</p>
                                <p>{cata.isVerified ? 'verified' : ''}</p>
                            </div>
                            <div className='grid grid-cols-2'>
                                <p>Phone: {cata.phone}</p>
                                <p>Location: {cata.location}</p>
                                <p>Original Price: {cata.originalPrice}</p>
                                <p>Resale Price: {cata.resalePrice}</p>
                                <p>Condition: {cata.condition}</p>
                                <p>Post Time:{cata.postTime}</p>
                            </div>
                            <p>{cata.description}</p>
                            <div className="card-actions justify-end">
                                <label htmlFor="bookingModal" className="btn btn-primary">Book Now</label>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="bookingModal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <label className="label"> <span className="label-text">Product Name</span></label>
                                    <h2 className="input input-bordered w-full max-w-xs flex items-center">{cata.productName}</h2>
                                    <label className="label"> <span className="label-text">User Name</span></label>
                                    <p className="input input-bordered w-full max-w-xs flex items-center">{user.displayName}</p>
                                    <label className="label"> <span className="label-text">User Email</span></label>
                                    <p className="input input-bordered w-full max-w-xs flex items-center">{user.email}</p>
                                    <label className="label"> <span className="label-text">Price</span></label>
                                    <p className="input input-bordered w-full max-w-xs flex items-center">{cata.resalePrice}</p>
                                    <label className="label"> <span className="label-text">Phone Number</span></label>
                                    <input onInput={e => setPhone(e.target.value)} className="input input-bordered w-full max-w-xs" type="text" name="phone" id="" />
                                    <label className="label"> <span className="label-text">Meeting Location</span></label>
                                    <input onInput={e => setLocation(e.target.value)} className="input input-bordered w-full max-w-xs" type="text" name="location" id="" />
                                    <div className="modal-action">
                                        <label className='btn btn-primary' htmlFor="bookingModal" onClick={() => hadleBookNow(cata.image, cata.productName, cata.resalePrice)}>
                                            Submit
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Products;