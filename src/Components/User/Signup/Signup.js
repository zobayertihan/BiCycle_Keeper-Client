import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';
import { AuthContext } from '../../Contexts/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, setSignIn, googleLogin } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        setSignUPError('');

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
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);

                            const userInfo = {
                                displayName: data.name,
                                photoURL: imageData.data.url,
                                status: false
                            }
                            console.log(userInfo)
                            updateUser(userInfo)
                                .then(() => {
                                    setSignIn(userInfo)
                                    saveUser(user?.displayName, user?.email, data.role);
                                })
                                .catch(error => console.log(error));
                        })
                        .catch(error => {
                            console.log(error)
                            setSignUPError(error.message)
                        });
                }
            })
    };

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }

    const handleGoogleSignin = () => {
        googleLogin().then(result => {
            const user = result.user;
            const speciality = {
                role: 'buyer'
            }
            toast.success('Logged in Successfully.');
            saveUser(user?.displayName, user?.email, speciality.role);
            navigate(from, { replace: true })
        })
    }



    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className='input input-bordered w-full max-w-xs'>
                        Sign Up as
                        <select {...register("role")} className='ml-3'>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Image</span></label>
                        <input type="file" {...register("image", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>

            </div>
        </div>
    );
};

export default Signup;