import React from 'react'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link';

const SocialHeader = () => {
    return (
        <>
            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <Link href="/social/create" className="btn btn-primary">
                    <FiPlus size={16} className='me-2' />
                    <span>Create Social</span>
                </Link>
            </div>
        </>
    )
}

export default SocialHeader;