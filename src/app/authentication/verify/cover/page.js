import OtpVerifyForm from '@/components/authentication/OtpVerifyForm'
import Image from 'next/image'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <main className="auth-cover-wrapper">
      <div className="auth-cover-content-inner">
        <div className="auth-cover-content-wrapper">
          <div className="auth-img">
            <Image width={600} height={600} sizes='100vw' src="/images/auth/auth-cover-verify-bg.svg" alt="img" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="auth-cover-sidebar-inner">
        <div className="auth-cover-card-wrapper">
          <div className="auth-cover-card p-sm-5">
            <div className="wd-50 mb-5">
              <img src="/images/logo-abbr.png" alt="img" className="img-fluid" />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <OtpVerifyForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
