import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import SocialForm from '@/components/social/SocialForm'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link href="/social/list" className="btn btn-secondary">
                        <span>Back to list</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SocialForm />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;
