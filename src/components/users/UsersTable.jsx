'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteUser } from '@/contentApi/userApi';
import Link from 'next/link';
import { useUsers } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const MySwal = withReactContent(Swal);

const UsersTable = () => {
  const { users } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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
          await deleteUser(id);
          setFilteredUsers(prev => prev.filter(user => user.id !== id));
          MySwal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          MySwal.fire('Failed!', 'Failed to delete the user.', 'error');
        }
      }
    })
  }

  const actions = (id) => [
    { label: "Edit", icon: <FiEdit3 />, onClick: () => router.push(`/users/edit/${id}`) },
    { label: "Delete", icon: <FiTrash2 />, onClick: () => handleDelete(id) },
  ];

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
      meta: { headerClassName: 'width-30' },
    },
    {
      accessorKey: 'name',
      header: () => 'Name',
      cell: (info) => {
        const name = info.getValue();
        return (
          <Link href={`/users/view/${info.row.original.id}`} className="hstack gap-3">
            <div className="text-white avatar-text user-avatar-text avatar-md">{name?.substring(0, 1)}</div>
            <div>
              <span className="text-truncate-1-line">{name}</span>
            </div>
          </Link>
        )
      }
    },
    { accessorKey: 'email', header: () => 'Email', cell: (info) => <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a> },
    { accessorKey: 'phone', header: () => 'Phone', cell: (info) => <a href={`tel:${info.getValue()}`}>{info.getValue()}</a> },
    { accessorKey: 'organisation_name', header: () => 'Organisation', cell: (info) => info.getValue() },
    { accessorKey: 'role_name', header: () => 'Role', cell: (info) => info.getValue() },
    {
      accessorKey: 'actions',
      header: () => "Actions",
      cell: ({ row }) => (
        <div className="hstack gap-2 justify-content-end">
          <Link href={`/users/view/${row.original.id}`} className="avatar-text avatar-md">
            <FiEye />
          </Link>
          <Dropdown dropdownItems={actions(row.original.id)} triggerClass='avatar-md' triggerPosition={"0,21"} triggerIcon={<FiMoreHorizontal />} />
        </div>
      ),
      meta: { headerClassName: 'text-end' }
    },
  ]

  return <Table data={filteredUsers} columns={columns} />;
}

export default UsersTable;