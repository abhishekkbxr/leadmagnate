import Link from 'next/link'
import React from 'react'

const SocialEditHeader = () => {
    return (
        <div className="d-flex align-items-center justify-content-between page-header-right-items-wrapper">
            <h3>Edit Social Configuration</h3>
            <Link href="/social/list" className="btn btn-secondary">
                <span>Back to list</span>
            </Link>
        </div>
    )
}

export default SocialEditHeader