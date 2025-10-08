'use client'
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import OrganisationsViewHeader from '@/components/organisations/OrganisationsViewHeader'
import OrganisationsViewContent from '@/components/organisations/OrganisationsViewContent'
import { useParams } from 'next/navigation'

const ViewOrganisationPage = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <OrganisationsViewHeader />
            </PageHeader>

            <div className='main-content'>
                <div className='row'>
                    <OrganisationsViewContent organisationId={id} />
                </div>
            </div>
        </>
    )
}

export default ViewOrganisationPage;