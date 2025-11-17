import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import SocialHeader from '@/components/social/SocialHeader'
import SocialTable from '@/components/social/SocialTable'
import Footer from '@/components/shared/Footer'

const page = () => {
    return (
        <>
            <PageHeader>
                <SocialHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SocialTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;
