'use client'
import React, { useEffect, useState } from 'react'
import { getUserById } from '@/contentApi/userApi'
import Loading from '@/components/shared/Loading'

const Card = ({ title, content }) => {
    return (
        <div className="row mb-4">
            <div className="col-lg-2 fw-medium">{title}</div>
            <div className="col-lg-10">{content}</div>
        </div>
    );
};

const UsersViewContent = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const result = await getUserById(userId);
                    if (result.success) {
                        setUser(result.data);
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

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    const userInfoData = [
        { title: 'Name', content: user.name },
        { title: 'Email', content: <a href={`mailto:${user.email}`}>{user.email}</a> },
        { title: 'Phone', content: <a href={`tel:${user.phone}`}>{user.phone}</a> },
        { title: 'Organisation', content: user.organisation_name },
        { title: 'Role', content: user.role_name },
    ];

    return (
        <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
            <div className="card card-body lead-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                        <span className="d-block mb-2">User Information :</span>
                        <span className="fs-12 fw-normal text-muted d-block">Following information for the user</span>
                    </h5>
                </div>
                {userInfoData.map((data, index) => (
                    <Card
                        key={index}
                        title={data.title}
                        content={data.content}
                    />
                ))}
            </div>
        </div>
    )
}

export default UsersViewContent;