'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BASE_URL } from '@/utils/api'

const MySwal = withReactContent(Swal)

const OtpVerifyForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the complete OTP!',
            });
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otpValue
                })
            });
            const data = await response.json();
            if (data.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }).then(() => {
                    router.push('/authentication/login/cover');
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
            <h2 className="fs-20 fw-bolder mb-4">Verify <a href="#" className="float-end fs-12 text-primary">Change Methord</a></h2>
            <h4 className="fs-13 fw-bold mb-2">Please enter th e code generated one time password to verify your account.</h4>
            <p className="fs-12 fw-medium text-muted"><span>A code has been sent to</span> <strong>{email}</strong></p>
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                    {
                        otp.map((data, index) => {
                            return <input
                                className="m-2 text-center form-control rounded"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                required
                            />
                        })
                    }
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Validate</button>
                </div>
                <div className="mt-5 text-muted">
                    <span>Didn't get the code</span>
                    <a href="#">Resend(1/3)</a>
                </div>
            </form>
        </>
    )
}

export default OtpVerifyForm
