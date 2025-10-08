'use client'
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import OrganisationsEditContent from '@/components/organisations/OrganisationsEditContent'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const EditOrganisationPage = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link href="/organisations/list" className="btn btn-secondary">
                        <span>Back to list</span>
                    </Link>
                </div>
            </PageHeader>

            <div className='main-content'>
                <div className='row'>
                    <OrganisationsEditContent organisationId={id} />
                </div>
            </div>
        </>
    )
}

export default EditOrganisationPage;