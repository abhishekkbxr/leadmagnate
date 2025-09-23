'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BASE_URL } from '@/utils/api'

const MySwal = withReactContent(Swal)

const LoginForm = ({ registerPath, resetPath }) => {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                login(data.data.user, data.data.token, data.data.expiresAt);
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }).then(() => {
                    router.push('/');
                });
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p>
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                    <div>
                        <Link href={resetPath} className="fs-11 text-primary">Forget password?</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Login</button>
                </div>
            </form>
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-toggle="tooltip" data-title="Login with Facebook">
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-toggle="tooltip" data-title="Login with Twitter">
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-toggle="tooltip" data-title="Login with Github">
                        <FiGithub size={16} className='text' />
                    </a>
                </div>
            </div>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link href={registerPath} className="fw-bold"> Create an Account</Link>
            </div>
        </>
    )
}

export default LoginForm
