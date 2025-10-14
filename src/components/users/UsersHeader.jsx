'use client'
import React from 'react'
import { FiFilter, FiPaperclip, FiPlus } from 'react-icons/fi'
import { BsFiletypeCsv, BsFiletypeExe, BsFiletypePdf, BsFiletypeTsx, BsFiletypeXml, BsPrinter } from 'react-icons/bs';
import Dropdown from '@/components/shared/Dropdown';
import Link from 'next/link';
import { useOrganisations } from '@/context/OrganisationContext';
import { useUsers } from '@/context/UserContext';

export const fileType = [
    { label: "PDF", icon: <BsFiletypePdf /> },
    { label: "CSV", icon: <BsFiletypeCsv /> },
    { label: "XML", icon: <BsFiletypeXml /> },
    { label: "Text", icon: <BsFiletypeTsx /> },
    { label: "Excel", icon: <BsFiletypeExe /> },
    { label: "Print", icon: <BsPrinter /> },
];

const UsersHeader = () => {
    const { organisations } = useOrganisations();
    const { setSelectedOrganisation } = useUsers();

    const filterAction = [
        { label: "All", onClick: () => setSelectedOrganisation(null) },
        ...organisations.map(org => ({ label: org.name, onClick: () => setSelectedOrganisation(org.id) }))
    ];

    return (
        <>
            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <Dropdown
                    dropdownItems={filterAction}
                    triggerPosition={"0, 12"}
                    triggerIcon={<FiFilter size={16} strokeWidth={1.6} />}
                    triggerClass='btn btn-icon btn-light-brand'
                    isAvatar={false}
                />
                <Dropdown
                    dropdownItems={fileType}
                    triggerPosition={"0, 12"}
                    triggerIcon={<FiPaperclip size={16} strokeWidth={1.6} />}
                    triggerClass='btn btn-icon btn-light-brand'
                    iconStrokeWidth={0}
                    isAvatar={false}
                />
                <Link href="/users/create" className="btn btn-primary">
                    <FiPlus size={16} className='me-2' />
                    <span>Create User</span>
                </Link>
            </div>
        </>
    )
}

export default UsersHeader;