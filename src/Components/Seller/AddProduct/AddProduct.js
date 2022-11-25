import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'


const AddProduct = () => {
    const { user } = useContext(AuthContext);
    console.log(user)

    // const { data: users = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => fetch(`http://localhost:5000/users/${user?.email}`)
    //         .then(res => res.json())
    // })
    // console.log(users[0].isVerified)


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addProductError, setAddProductError] = useState('');
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const postTime = `${date} ${time}`


    const handleAddProduct = (data) => {
        setAddProductError('');
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const product = {
                        catagory: data.catagory,
                        productName: data.productName,
                        image: imageData.data.url,
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        phone: data.phone,
                        location: data.location,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        condition: data.condition,
                        usedfor: data.usedfor,
                        postTime: postTime,
                        isVerified: "No",
                        description: data.description
                    }

                    fetch(`http://localhost:5000/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.productName} is added successfully`);
                            navigate('/')
                        })
                }
            })
    };

    const { data: catagories, isLoading } = useQuery({
        queryKey: ['catagory'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/catagories');
            const data = await res.json();
            return data;
        }
    })
    console.log(catagories)


    return (
        <div className='h-[800px] mt-32 flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Add a Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Catagory</span></label>
                        <div className='input input-bordered w-full max-w-xs'>
                            <select
                                {...register('catagory')}
                                className="select input-bordered w-full max-w-xs">
                                {
                                    catagories?.map(catagory => <option
                                        key={catagory._id}
                                        value={catagory.catagoryName}
                                    >{catagory.catagoryName}</option>)
                                }


                            </select>
                        </div>
                        {errors.catagory && <p className='text-red-500'>{errors.catagory.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text" {...register("productName", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.productName && <p className='text-red-500'>{errors.productName.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Image</span></label>
                        <input type="file" {...register("image", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Phone</span></label>
                        <input type="text" {...register("phone", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <input type="text" {...register("location", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Original Price</span></label>
                        <input type="text" {...register("originalPrice", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Resale Price</span></label>
                        <input type="text" {...register("resalePrice", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.resalePrice && <p className='text-red-500'>{errors.resalePrice.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Condition</span></label>
                        <div className='input input-bordered w-full max-w-xs'>
                            <select {...register("condition")} className='ml-3'>
                                <option value="good">Good</option>
                                <option value="well">Well</option>
                                <option value="bad">Bad</option>
                            </select>
                        </div>
                        {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Used for</span></label>
                        <input type="text" {...register("usedfor", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.usedfor && <p className='text-red-500'>{errors.usedfor.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Description</span></label>
                        <input type="text" {...register("description", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add Product" type="submit" />
                    {addProductError && <p className='text-red-600'>{addProductError}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddProduct;