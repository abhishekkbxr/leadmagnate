'use client'
import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import UsersEditContent from '@/components/users/UsersEditContent'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const EditUserPage = () => {
    const { id } = useParams();
    return (
        <>
            <PageHeader>
                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link href="/users/list" className="btn btn-secondary">
                        <span>Back to list</span>
                    </Link>
                </div>
            </PageHeader>

            <div className='main-content'>
                <div className='row'>
                    <UsersEditContent userId={id} />
                </div>
            </div>
        </>
    )
}

export default EditUserPage;