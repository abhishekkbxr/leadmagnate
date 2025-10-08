'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiEye, FiHash } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BASE_URL } from '@/utils/api'

const MySwal = withReactContent(Swal)

const RegisterForm = ({ path }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (data.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }).then(() => {
                    router.push(`/authentication/verify/cover?email=${formData.email}`);
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
            <h2 className="fs-20 fw-bolder mb-4">Register</h2>
            <h4 className="fs-13 fw-bold mb-2">Manage all your Duralux crm</h4>
            <p className="fs-12 fw-medium text-muted">Let&apos;s get you all setup, so you can verify your personal
                account and begine setting up your profile.</p>
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <input type="tel" name="phone" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-4 generate-pass">
                    <div className="input-group field">
                        <input type="password" name="password" className="form-control password" id="newPassword" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <div className="input-group-text c-pointer gen-pass" data-toggle="tooltip" data-title="Generate Password"><FiHash size={16} /></div>
                        <div className="input-group-text border-start bg-gray-2 c-pointer" data-toggle="tooltip" data-title="Show/Hide Password"><FiEye size={16} /></div>
                    </div>
                </div>
                <div className="mb-4">
                    <input type="password" name="confirmPassword" className="form-control" placeholder="Password again" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="mt-4">
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="receiveMial" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="receiveMial" style={{ fontWeight: '400 !important' }}>Yes, I wnat to receive Duralux community
                            emails</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="termsCondition" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="termsCondition" style={{ fontWeight: '400 !important' }}>I agree to all the <a href="#">Terms &amp;
                            Conditions</a> and <a href="#">Fees</a>.</label>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Create Account</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span>Already have an account?</span>
                <Link href={path} className="fw-bold"> Login</Link>
            </div>
        </>
    )
}

export default RegisterForm
