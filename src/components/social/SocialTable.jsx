'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteSocialConfig, getSocialConfigs, updateSocialConfig } from '@/contentApi/socialApi';

const MySwal = withReactContent(Swal);

const SocialTable = () => {
    const [socialConfigs, setSocialConfigs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSocialConfigs = async () => {
            try {
                const configs = await getSocialConfigs();
                setSocialConfigs(configs);
            } catch (error) {
                MySwal.fire('Failed!', 'Failed to fetch social configurations.', 'error');
            }
        };
        fetchSocialConfigs();
    }, []);

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
                    await deleteSocialConfig(id);
                    setSocialConfigs(prev => prev.filter(config => config.id !== id));
                    MySwal.fire('Deleted!', 'The social configuration has been deleted.', 'success');
                } catch (error) {
                    MySwal.fire('Failed!', 'Failed to delete the social configuration.', 'error');
                }
            }
        })
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            const booleanStatus = newStatus === true || newStatus === 'active';
            const updatedConfig = await updateSocialConfig(id, { is_active: booleanStatus });
            setSocialConfigs(prev => prev.map(config => config.id === id ? updatedConfig : config));
            MySwal.fire('Updated!', 'The social configuration status has been updated.', 'success');
        } catch (error) {
            MySwal.fire('Failed!', 'Failed to update the social configuration status.', 'error');
        }
    };

    const columns = [
        {
            accessorKey: 'ads_name',
            header: () => 'Ads Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'page_id',
            header: () => 'Page ID',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'is_active',
            header: () => 'Status',
            cell: ({ row }) => (
                <select
                    value={row.original.is_active ? 'active' : 'inactive'}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    className="form-select"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            ),
        },
        {
            accessorKey: 'actions',
            header: () => "Actions",
            cell: ({ row }) => (
                <div className="hstack gap-2 justify-content-end">
                    <Link href={`/social/edit/${row.original.id}`} className="btn btn-icon btn-light-brand">
                        <FiEdit3 />
                    </Link>
                    <button onClick={() => handleDelete(row.original.id)} className="btn btn-icon btn-light-danger">
                        <FiTrash2 />
                    </button>
                </div>
            ),
            meta: { headerClassName: 'text-end' }
        },
    ]

    return <Table data={socialConfigs} columns={columns} />;
}

export default SocialTable;