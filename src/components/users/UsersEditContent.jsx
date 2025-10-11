'use client'
import React, { useEffect, useState } from 'react'
import Input from '@/components/shared/Input'
import { getUserById, updateUser } from '@/contentApi/userApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import Loading from '@/components/shared/Loading'
import { useUsers } from '@/context/UserContext'

const MySwal = withReactContent(Swal);

const UsersEditContent = ({ userId }) => {
    const router = useRouter();
    const { refreshUsers } = useUsers();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        organisation_id: '',
        role_id: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const result = await getUserById(userId);
                    if (result.success) {
                        const userData = result.data;
                        setFormData({
                            name: userData.name || '',
                            phone: userData.phone || '',
                            organisation_id: userData.organisation_id || '',
                            role_id: userData.role_id || '',
                        });
                    } else {
                        console.error("Failed to fetch user:", result);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: formData.name,
            phone: formData.phone,
            organisation_id: formData.organisation_id,
            role_id: formData.role_id,
        };
        try {
            const result = await updateUser(userId, userData);
            if (result.success) {
                await refreshUsers(); // Wait for refresh to complete
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
            console.error("Error updating user:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update user.',
            });
        }
    }

    if (loading) {
        return <Loading />;
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
                                <Input
                                    label="Role"
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                    placeholder="Enter role"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UsersEditContent;