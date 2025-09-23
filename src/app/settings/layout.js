'use client'
import React from 'react'
import NavigationManu from '@/components/shared/navigationMenu/NavigationMenu'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import SettingSidebar from '@/components/setting/SettingSidebar'
import Header from '@/components/shared/header/Header'
import { usePathname } from 'next/navigation'
import withAuth from '@/hoc/withAuth'

const SettingsLayout = ({ children }) => {
    const pathName = usePathname()
    useBootstrapUtils(pathName)

    return (
        <>
            <Header />
            <NavigationManu />
            <main className="nxl-container apps-container">
                <div className="nxl-content without-header nxl-full-content">
                    <div className='main-content d-flex'>
                        <SettingSidebar />
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default withAuth(SettingsLayout)
