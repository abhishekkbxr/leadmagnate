'use client'
import React, { memo, useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import getIcon from '@/utils/getIcon';
import { BASE_URL } from '@/utils/api';
import LeadView from './LeadView';
import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/context/UserContext';


const actions = [
    { label: "Edit", icon: <FiEdit3 /> },
    { label: "Print", icon: <FiPrinter /> },
    { label: "Remind", icon: <FiClock /> },
    { type: "divider" },
    { label: "Archive", icon: <FiArchive /> },
    { label: "Report Spam", icon: <FiAlertOctagon />, },
    { type: "divider" },
    { label: "Delete", icon: <FiTrash2 />, },
];

const TableCell = memo(({ options, defaultSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <SelectDropdown
            options={options}
            defaultSelect={defaultSelect}
            selectedOption={selectedOption}
            onSelectOption={(option) => setSelectedOption(option)}
        />
    );
});


const LeadssTable = () => {
    const { token } = useAuth();
    const { users } = useUsers();
    const [leads, setLeads] = useState([]);
    const [selectedLeadId, setSelectedLeadId] = useState(null);

    const handleViewLead = (leadId) => {
        setSelectedLeadId(leadId);
    };

    useEffect(() => {
        if (token) {
            const fetchLeads = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/leads?module_id=7&action=read`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await res.json();
                    if (result.success) {
                        setLeads(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching leads:", error);
                }
            };
            fetchLeads();
        }
    }, [token]);

    const columns = [
        {
            accessorKey: 'id',
            header: ({ table }) => {
                const checkboxRef = React.useRef(null);

                useEffect(() => {
                    if (checkboxRef.current) {
                        checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
                    }
                }, [table.getIsSomeRowsSelected()]);

                return (
                    <input
                        type="checkbox"
                        className="custom-table-checkbox"
                        ref={checkboxRef}
                        checked={table.getIsAllRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                );
            },
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="custom-table-checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
            meta: {
                headerClassName: 'width-30',
            },
        },

        {
            accessorKey: 'full_name',
            header: () => 'Customer',
            cell: (info) => {
                const fullName = info.getValue();
                return (
                    <a href="#" className="hstack gap-3">
                        <div className="text-white avatar-text user-avatar-text avatar-md">{fullName?.substring(0, 1)}</div>
                        <div>
                            <span className="text-truncate-1-line">{fullName}</span>
                        </div>
                    </a>
                )
            }
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            cell: (info) => <a href="apps-email.html">{info.getValue()}</a>
        },
        {
            accessorKey: 'source_page_name',
            header: () => 'Source',
            cell: (info) => {
                const source = info.getValue();
                return (
                    <div className="hstack gap-2">
                        <div className="avatar-text avatar-sm">
                            {getIcon('website')}
                        </div>
                        <a href="#">{source}</a>
                    </div>
                )
            }
        },
        {
            accessorKey: 'phone',
            header: () => 'Phone',
            cell: (info) => <a href="tel:">{info.getValue()}</a>
            // meta: {
            //     className: "fw-bold text-dark"
            // }
        },
        {
            accessorKey: 'created_at',
            header: () => 'Date',
            cell: (info) => new Date(info.getValue()).toLocaleDateString()
        },
        {
            accessorKey: 'assigned_to',
            header: () => 'Assigned To',
            cell: (info) => {
                const userOptions = users.map(user => ({ label: user.name, value: user.id }));
                const currentAssignee = info.getValue();
                return <TableCell options={userOptions} defaultSelect={currentAssignee} />
            }
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: (info) => {
                const statusOptions = [
                    { label: 'New', value: 'new' },
                    { label: 'Contacted', value: 'contacted' },
                    { label: 'Qualified', value: 'qualified' },
                    { label: 'Lost', value: 'lost' },
                    { label: 'Won', value: 'won' },
                ];
                const currentStatus = info.getValue();
                return <TableCell options={statusOptions} defaultSelect={currentStatus} />
            }
        },
        {
            accessorKey: 'actions',
            header: () => "Actions",
            cell: ({ row }) => (
                <div className="hstack gap-2 justify-content-end">
                    <button onClick={() => handleViewLead(row.original.id)} className="avatar-text avatar-md">
                        <FiEye />
                    </button>
                    <Dropdown dropdownItems={actions} triggerClassNaclassName='avatar-md' triggerPosition={"0,21"} triggerIcon={<FiMoreHorizontal />} />
                </div>
            ),
            meta: {
                headerClassName: 'text-end'
            }
        },
    ]
    return (
        <>
            {selectedLeadId ? (
                <LeadView leadId={selectedLeadId} />
            ) : (
                <Table data={leads} columns={columns} />
            )}
        </>
    )
}

export default LeadssTable
