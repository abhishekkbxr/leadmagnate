import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import OrganisationsHeader from '@/components/organisations/OrganisationsHeader'
import OrganisationsTable from '@/components/organisations/OrganisationsTable'
import Footer from '@/components/shared/Footer'

const page = () => {
    return (
        <>
            <PageHeader>
                <OrganisationsHeader />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <OrganisationsTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;