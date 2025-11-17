'use client'
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import SocialForm from '@/components/social/SocialForm'
import Footer from '@/components/shared/Footer'
import SocialEditHeader from '@/components/social/SocialEditHeader'
import { useParams } from 'next/navigation'

const page = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <SocialEditHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SocialForm socialId={id} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;
