'use client'
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import UsersViewHeader from '@/components/users/UsersViewHeader'
import UsersViewContent from '@/components/users/UsersViewContent'
import { useParams } from 'next/navigation'

const ViewUserPage = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <UsersViewHeader />
            </PageHeader>

            <div className='main-content'>
                <div className='row'>
                    <UsersViewContent userId={id} />
                </div>
            </div>
        </>
    )
}

export default ViewUserPage;