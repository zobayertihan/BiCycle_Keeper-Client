import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast'
import useToken from '../../../Hooks/useToken';


const Signup = () => {
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const { register, handleSubmit, formState: { errors } } = useForm();
    if (token) {
        navigate('/');
    }
    const handleSignup = (data) => {
        setSignUpError('');
        createUser(data.email, data.pass)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast('User Created Successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(e => setSignUpError(e))
            })
            .catch(e => console.error(e))

    }
    const handleGoogleLogin = () => {
        console.log('clicked')
        googleLogin()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email);
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-10'>
                <h2 className='text-4xl'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" {...register("name", { required: 'Name is required' })} />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full max-w-xs" {...register("email", { required: 'Email Address is required' })} />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs" {...register("pass", { required: 'Password is required', minLength: { value: 6, message: 'Password must be 6 characters or longer' }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password Must have a uppercase a lowercase a number and a special character ' } })} />
                        {errors.pass && <p className='text-red-600'>{errors.pass?.message}</p>}
                    </div>
                    <div>
                        <label className="label">
                            {
                                signUpError &&
                                <span className="label-text">{signUpError}</span>
                            }
                        </label>
                    </div>
                    <input className='btn btn-accent w-full mt-10' value={'SIgnup'} type="submit" />
                </form>
                <p className='text-center mt-5'>Already have an account? <Link className='text-primary' to={'/login'}>Sign in</Link></p>
                <p className=' divider'>OR</p>
                <button onClick={handleGoogleLogin} className='btn btn-ghost w-full btn-outline'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Signup;