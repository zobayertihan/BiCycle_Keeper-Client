import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Products = () => {
    const { catagory } = useParams();
    const [catagories, setCatagories] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/catagory/${catagory}`)
            .then(res => res.json())
            .then(data => {
                setCatagories(data.data)
            })
    }, [catagory])
    const hadleBookNow = () => {
        fetch(`http://localhost:5000`)
    }
    return (
        <div className='mt-10'>
            {
                catagories.map(cata =>
                    <div key={cata._id} className="card max-w-screen-md mx-auto bg-base-100 shadow-xl">
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
                                <button onClick={hadleBookNow} className="btn btn-primary">Book Now</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Products;