'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';


const Card = ({ title, content }) => (
    <div className="row mb-4">
        <div className="col-lg-3 fw-medium">{title}</div>
        <div className="col-lg-9">{content}</div>
    </div>
);

const LeadView = ({ leadId }) => {
    const { token } = useAuth();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (leadId && token) {
            const fetchLead = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/leads/${leadId}?module_id=7&action=read`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await res.json();
                    if (result.success) {
                        setLead(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching lead:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLead();
        }
    }, [leadId, token]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!lead) {
        return <div>Lead not found</div>;
    }

    const leadInfoData = [
        { title: 'Full Name', content: lead.full_name },
        { title: 'First Name', content: lead.first_name },
        { title: 'Last Name', content: lead.last_name },
        { title: 'Email', content: <a href={`mailto:${lead.email}`}>{lead.email}</a> },
        { title: 'Phone', content: <a href={`tel:${lead.phone}`}>{lead.phone}</a> },
        { title: 'Status', content: lead.status },
        { title: 'Notes', content: lead.raw_field_data?.notes },
        { title: 'Organisation ID', content: lead.organisation_id },
        { title: 'Lead Meta ID', content: lead.lead_meta_id },
        { title: 'Source Page', content: lead.source_page_name },
        { title: 'Platform Key', content: lead.platform_key },
        { title: 'Consent Time', content: lead.consent_time },
        { title: 'Assigned User ID', content: lead.assigned_user_id },
        { title: 'Assigned At', content: lead.assigned_at },
        { title: 'Created At', content: lead.created_at },
        { title: 'Updated At', content: lead.updated_at },
        { title: 'Entry Type', content: lead.raw_field_data?.entry_type },
        { title: 'Created By', content: lead.raw_field_data?.created_by },
    ];

    return (
        <div className="tab-pane fade show active" id="leadProfileTab" role="tabpanel">
            <div className="card card-body lead-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                        <span className="d-block mb-2">Lead Information :</span>
                        <span className="fs-12 fw-normal text-muted d-block">Following information for this lead</span>
                    </h5>
                </div>
                {leadInfoData.map((data, index) => (
                    <Card
                        key={index}
                        title={data.title}
                        content={data.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default LeadView;
