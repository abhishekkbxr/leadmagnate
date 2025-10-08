'use client'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({ children }) => {
    const pathName = usePathname()
    useBootstrapUtils(pathName)

    return (
        <>
            {children}
        </>
    )
}

export default Layout