import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../Hooks/useToken';


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const { loginUser, googleLogin } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        console.log(data);
        loginUser(data.email, data.pass)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)
            })
            .catch(e => setLoginError(e.message))
    }
    const handleGoogleLogin = () => {
        console.log('clicked')
        googleLogin()
            .then(() => { })
            .catch(e => console.error(e))
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-10'>
                <h2 className='text-4xl'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        <input type="password" className="input input-bordered w-full max-w-xs" {...register("pass", { required: 'Password is required', minLength: { value: 6, message: 'Password must be 6 characters or longer' } })} />
                        {errors.pass && <p className='text-red-600'>{errors.pass?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                        <label className='label'>
                            <div>
                                {loginError && <p>{loginError}</p>}
                            </div>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full mt-10' value={'Login'} type="submit" />

                </form>

                <p className='text-center mt-5'>New to Doctor's Portal? <Link className='text-primary' to={'/signup'}>Create an Account</Link></p>
                <p className=' divider'>OR</p>
                <button onClick={handleGoogleLogin} className='btn btn-ghost w-full btn-outline'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;