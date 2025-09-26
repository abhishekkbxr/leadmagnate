'use client'
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

const LeadView = ({ leadId }) => {
    const { token } = useAuth();
    const [lead, setLead] = useState(null);

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
                }
            };
            fetchLead();
        }
    }, [leadId, token]);

    if (!lead) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{lead.full_name}</h2>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone}</p>
            <p><strong>Status:</strong> {lead.status}</p>
            <p><strong>Source:</strong> {lead.source_page_name}</p>
        </div>
    );
};

export default LeadView;
