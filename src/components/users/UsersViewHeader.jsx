import Link from 'next/link'
import React from 'react'

const UsersViewHeader = () => {
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        <Link href="/users/list" className="btn btn-secondary">
            <span>Back to list</span>
        </Link>
    </div>
  )
}

export default UsersViewHeader;