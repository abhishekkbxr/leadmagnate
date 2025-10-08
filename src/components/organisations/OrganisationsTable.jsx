'use client'
import React, { memo, useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getOrganisations, deleteOrganisation } from '@/contentApi/organisationApi';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

const OrganisationsTable = () => {
    const { token } = useAuth();
    const [organisations, setOrganisations] = useState([]);
    const [filteredOrganisations, setFilteredOrganisations] = useState([]);

    const handleDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOrganisation(id);
                    setFilteredOrganisations(filteredOrganisations.filter(org => org.id !== id));
                    MySwal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (error) {
                    MySwal.fire(
                        'Failed!',
                        'Failed to delete the organisation.',
                        'error'
                    )
                }
            }
        })
    }

    const actions = (id) => [
        { label: <Link href={`/organisations/edit/${id}`}>Edit</Link>, icon: <FiEdit3 /> },
        { label: "Delete", icon: <FiTrash2 />, onClick: () => handleDelete(id) },
    ];

    useEffect(() => {
        if (token) {
            const fetchOrganisations = async () => {
                try {
                    const result = await getOrganisations();
                    if (result.success) {
                        setOrganisations(result.data);
                        setFilteredOrganisations(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching organisations:", error);
                }
            };
            fetchOrganisations();
        }
    }, [token]);

    const columns = [
        {
            accessorKey: 'id',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    className="custom-table-checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="custom-table-checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
            meta: {
                headerClassName: 'width-30',
            },
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (info) => {
                const name = info.getValue();
                return (
                    <Link href={`/organisations/view/${info.row.original.id}`} className="hstack gap-3">
                        <div className="text-white avatar-text user-avatar-text avatar-md">{name?.substring(0, 1)}</div>
                        <div>
                            <span className="text-truncate-1-line">{name}</span>
                        </div>
                    </Link>
                )
            }
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            cell: (info) => <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>
        },
        {
            accessorKey: 'phone',
            header: () => 'Phone',
            cell: (info) => <a href={`tel:${info.getValue()}`}>{info.getValue()}</a>
        },
        {
            accessorKey: 'website',
            header: () => 'Website',
            cell: (info) => <a href={info.getValue()} target="_blank" rel="noopener noreferrer">{info.getValue()}</a>
        },
        {
            accessorKey: 'industry',
            header: () => 'Industry',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'actions',
            header: () => "Actions",
            cell: ({ row }) => (
                <div className="hstack gap-2 justify-content-end">
                    <Link href={`/organisations/view/${row.original.id}`} className="avatar-text avatar-md">
                        <FiEye />
                    </Link>
                    <Dropdown dropdownItems={actions(row.original.id)} triggerClassNaclassName='avatar-md' triggerPosition={"0,21"} triggerIcon={<FiMoreHorizontal />} />
                </div>
            ),
            meta: {
                headerClassName: 'text-end'
            }
        },
    ]

    return (
        <Table data={filteredOrganisations} columns={columns} />
    )
}

export default OrganisationsTable;