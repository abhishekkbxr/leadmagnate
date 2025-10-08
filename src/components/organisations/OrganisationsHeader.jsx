import React from 'react'
import { FiBarChart, FiBriefcase, FiDollarSign, FiEye, FiFilter, FiFlag, FiPaperclip, FiPlus, FiUserCheck, FiUserMinus, FiUsers } from 'react-icons/fi'
import { BsFiletypeCsv, BsFiletypeExe, BsFiletypePdf, BsFiletypeTsx, BsFiletypeXml, BsPrinter } from 'react-icons/bs';
import Dropdown from '@/components/shared/Dropdown';
import Link from 'next/link';

const filterAction = [
    { label: "All", icon: <FiEye /> },
    { label: "Group", icon: <FiUsers /> },
    { label: "Country", icon: <FiFlag /> },
    { label: "Industry", icon: <FiBriefcase /> },
    { label: "Active", icon: <FiUserCheck /> },
    { label: "Inactive", icon: <FiUserMinus /> },
];
export const fileType = [
    { label: "PDF", icon: <BsFiletypePdf /> },
    { label: "CSV", icon: <BsFiletypeCsv /> },
    { label: "XML", icon: <BsFiletypeXml /> },
    { label: "Text", icon: <BsFiletypeTsx /> },
    { label: "Excel", icon: <BsFiletypeExe /> },
    { label: "Print", icon: <BsPrinter /> },
];

const OrganisationsHeader = () => {
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
                <Link href="/organisations/create" className="btn btn-primary">
                    <FiPlus size={16} className='me-2' />
                    <span>Create Organisation</span>
                </Link>
            </div>
        </>
    )
}

export default OrganisationsHeader;