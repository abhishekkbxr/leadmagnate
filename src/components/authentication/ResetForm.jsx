'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/utils/api'

const ResetForm = ({ path }) => {
    const [email, setEmail] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/auth/request-password-change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const data = await response.json()
            if (data.success) {
                router.push('/authentication/verify-password-change/cover')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Reset Password</h2>
            <p className="fs-12 fw-medium text-muted">Enter your email to receive an OTP to reset your password.</p>
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Send OTP</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link href={path} className="fw-bold"> Create an Account</Link>
            </div>
        </>
    )
}

export default ResetForm
