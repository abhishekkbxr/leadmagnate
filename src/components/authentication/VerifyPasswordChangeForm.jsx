'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/utils/api'

const VerifyPasswordChangeForm = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-password-change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp, new_password: newPassword })
            })
            const data = await response.json()
            if (data.success) {
                alert('Password changed successfully!')
                router.push('/authentication/login/cover')
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
            <h2 className="fs-20 fw-bolder mb-4">Verify Password Change</h2>
            <p className="fs-12 fw-medium text-muted">Enter your email, the OTP you received, and your new password.</p>
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
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="OTP"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Change Password</button>
                </div>
            </form>
        </>
    )
}

export default VerifyPasswordChangeForm
