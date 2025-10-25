'use client'
import React, { memo, useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import getIcon from '@/utils/getIcon';
import { BASE_URL } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/context/UserContext';
import { useOrganisations } from '@/context/OrganisationContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


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

const TableCell = memo(function TableCell({ options, defaultSelect, onAssign, leadId, organisationId }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        if (onAssign) {
            onAssign(leadId, option.value, organisationId);
        }
    };

    return (
        <SelectDropdown
            options={options}
            defaultSelect={defaultSelect}
            selectedOption={selectedOption}
            onSelectOption={handleSelect}
        />
    );
});


const HeaderCheckbox = ({ table }) => {
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
};

const LeadssTable = () => {
    const { token } = useAuth();
    const { users } = useUsers();
    const { organisations } = useOrganisations();
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [organisationUsers, setOrganisationUsers] = useState([]);
    const [selectedOrganisation, setSelectedOrganisation] = useState(null);
    const router = useRouter();

    const handleViewLead = (leadId) => {
        router.push(`/leads/view/${leadId}`);
    };

    const handleAssignLead = async (lead_id, assigned_user_id, organisation_id) => {
        try {
            const res = await fetch(`${BASE_URL}/assignments/manual-assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lead_id, assigned_user_id, organisation_id })
            });
            const result = await res.json();
            if (result.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message,
                });
                setFilteredLeads(filteredLeads.map(lead => lead.id === lead_id ? { ...lead, assigned_user_id } : lead));
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error("Error assigning lead:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to assign lead.',
            });
        }
    };

    const fetchOrganisationLeads = async (organisationId) => {
        try {
            console.log("Fetching leads for organization:", organisationId);
            const res = await fetch(`${BASE_URL}/leads/organisation/${organisationId}?module_id=7&action=read`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            console.log("Organisation leads API response:", result);
            if (result.success && result.data) {
                setFilteredLeads(result.data);
                console.log("Filtered leads set:", result.data);
            } else {
                console.error("Failed to fetch organisation leads:", result);
                setFilteredLeads([]);
            }
        } catch (error) {
            console.error("Error fetching organisation leads:", error);
            setFilteredLeads([]);
        }
    };

    const fetchOrganisationUsers = async (organisationId) => {
        try {
            console.log("Fetching users for organization:", organisationId);
            const res = await fetch(`${BASE_URL}/users/organisation/${organisationId}?module_id=3&action=read`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            console.log("Organisation users API response:", result);
            if (result.success && result.data) {
                setOrganisationUsers(result.data);
                console.log("Organisation users set:", result.data);
            } else {
                console.error("Failed to fetch organisation users:", result);
                setOrganisationUsers([]);
            }
        } catch (error) {
            console.error("Error fetching organisation users:", error);
            setOrganisationUsers([]);
        }
    };

    const handleOrganisationChange = (organisation) => {
        setSelectedOrganisation(organisation);
        if (organisation && organisation.value !== 'all') {
            fetchOrganisationLeads(organisation.value);
            fetchOrganisationUsers(organisation.value);
        } else {
            setFilteredLeads(leads);
            setOrganisationUsers([]);
        }
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
                        setFilteredLeads(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching leads:", error);
                }
            };
            fetchLeads();
        }
    }, [token]);


    const organisationOptions = [
        { label: 'All Organisations', value: 'all' },
        ...organisations.map(org => ({ label: org.name, value: org.id }))
    ];

    const columns = [
        {
            accessorKey: 'id',
            header: ({ table }) => <HeaderCheckbox table={table} />,
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
            accessorKey: 'assigned_user_id',
            header: () => 'Assigned To',
            cell: (info) => {
                // Filter users based on the individual lead's organisation_id
                const leadOrganisationId = info.row.original.organisation_id;
                const availableUsers = users.filter(user => user.organisation_id === leadOrganisationId);
                const userOptions = availableUsers.map(user => ({ label: user.name, value: user.id }));
                const currentAssignee = info.getValue();
                return <TableCell
                    options={userOptions}
                    defaultSelect={currentAssignee}
                    onAssign={handleAssignLead}
                    leadId={info.row.original.id}
                    organisationId={leadOrganisationId}
                />
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
        <Table 
            data={filteredLeads} 
            columns={columns} 
            customSearch={
                <div style={{ width: '200px' }}>
                    <SelectDropdown
                        options={organisationOptions}
                        defaultSelect="All Organisations"
                        onSelectOption={handleOrganisationChange}
                        selectedOption={selectedOrganisation}
                    />
                </div>
            }
        />
    )
}

export default LeadssTable
