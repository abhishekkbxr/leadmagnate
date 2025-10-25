'use client'
import React, { useState } from 'react'
import Input from '@/components/shared/Input'
import Select from '@/components/shared/Select'
import { createUser } from '@/contentApi/userApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/context/UserContext'

const MySwal = withReactContent(Swal);

const UsersCreateContent = () => {
    const router = useRouter();
    const { refreshUsers } = useUsers();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organisation_id: '',
        role_id: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organisation_id: formData.organisation_id,
            role_id: formData.role_id,
        };
        try {
            const result = await createUser(userData);
            if (result.success) {
                await refreshUsers(); // Refresh the users list
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message,
                });
                router.push('/users/list');
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create user.',
            });
        }
    }

    return (
        <div className="col-lg-12">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Organisation"
                                    name="organisation_id"
                                    value={formData.organisation_id}
                                    onChange={handleChange}
                                    placeholder="Enter organisation"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Select
                                    label="Role"
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: '3', label: 'Manager' },
                                        { value: '4', label: 'Team Lead' },
                                        { value: '5', label: 'Salesman' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UsersCreateContent;