import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import SocialForm from '@/components/social/SocialForm'
import Footer from '@/components/shared/Footer'
import SocialCreateHeader from '@/components/social/SocialCreateHeader'

const page = () => {
    return (
        <>
            <PageHeader>
                <SocialCreateHeader />
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
