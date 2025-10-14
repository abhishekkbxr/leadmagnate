'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteUser, assignOrganisation, removeOrganisation, assignRole, removeRole } from '@/contentApi/userApi';
import Link from 'next/link';
import { useUsers } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useOrganisations } from '@/context/OrganisationContext';

const MySwal = withReactContent(Swal);

const UsersTable = () => {
  const { users, refreshUsers } = useUsers();
  const { organisations } = useOrganisations();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  const roles = [
    { id: 1, name: "Superadmin" },
    { id: 2, name: "Org-admin" },
    { id: 3, name: "Manager" },
  ];

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
          refreshUsers();
          MySwal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          MySwal.fire('Failed!', 'Failed to delete the user.', 'error');
        }
      }
    })
  }

  const handleAssignOrganisation = async (userId, organisationId) => {
    try {
      await assignOrganisation(userId, organisationId);
      refreshUsers();
      MySwal.fire('Assigned!', 'The user has been assigned to the organisation.', 'success');
    } catch (error) {
      MySwal.fire('Failed!', 'Failed to assign the user to the organisation.', 'error');
    }
  }

  const handleRemoveOrganisation = async (userId) => {
    try {
      await removeOrganisation(userId);
      refreshUsers();
      MySwal.fire('Removed!', 'The user has been removed from the organisation.', 'success');
    } catch (error) {
      MySwal.fire('Failed!', 'Failed to remove the user from the organisation.', 'error');
    }
  }

    const handleAssignRole = async (userId, roleId) => {
        try {
            await assignRole(userId, roleId);
            refreshUsers();
            MySwal.fire('Assigned!', 'The role has been assigned to the user.', 'success');
        } catch (error) {
            MySwal.fire('Failed!', 'Failed to assign the role to the user.', 'error');
        }
    }

    const handleRemoveRole = async (userId) => {
        try {
            await removeRole(userId);
            refreshUsers();
            MySwal.fire('Removed!', 'The role has been removed from the user.', 'success');
        } catch (error) {
            MySwal.fire('Failed!', 'Failed to remove the role from the user.', 'error');
        }
    }

  const actions = (id) => [
    { label: "Edit", icon: <FiEdit3 />, onClick: () => router.push(`/users/edit/${id}`) },
    { label: "Delete", icon: <FiTrash2 />, onClick: () => handleDelete(id) },
  ];

  const organisationActions = (user) => [
    ...organisations.map(org => ({ label: org.name, onClick: () => handleAssignOrganisation(user.id, org.id) })),
    { label: "Remove", onClick: () => handleRemoveOrganisation(user.id) },
  ];

    const roleActions = (user) => [
        ...roles.map(role => ({ label: role.name, onClick: () => handleAssignRole(user.id, role.id) })),
        { label: "Remove", onClick: () => handleRemoveRole(user.id) },
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
    {
        accessorKey: 'organisation_name',
        header: () => 'Organisation',
        cell: ({ row }) => (
            <Dropdown dropdownItems={organisationActions(row.original)} triggerClass='btn btn-light-brand' triggerText={row.original.organisation_name || 'Not Assigned'} dropdownMenuStyle={{ minWidth: '200px' }} />
        )
    },
    {
        accessorKey: 'role_name',
        header: () => 'Role',
        cell: ({ row }) => (
            <Dropdown dropdownItems={roleActions(row.original)} triggerClass='btn btn-light-brand' triggerText={row.original.role_name || 'Not Assigned'} dropdownMenuStyle={{ minWidth: '200px' }} />
        )
    },
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