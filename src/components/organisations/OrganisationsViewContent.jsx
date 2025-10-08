'use client'
import React, { useEffect, useState } from 'react'
import { getOrganisationById } from '@/contentApi/organisationApi'
import Loading from '@/components/shared/Loading'

const Card = ({ title, content }) => {
    return (
        <div className="row mb-4">
            <div className="col-lg-2 fw-medium">{title}</div>
            <div className="col-lg-10">{content}</div>
        </div>
    );
};

const OrganisationsViewContent = ({ organisationId }) => {
    const [organisation, setOrganisation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (organisationId) {
            const fetchOrganisation = async () => {
                try {
                    const result = await getOrganisationById(organisationId);
                    if (result.success) {
                        setOrganisation(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching organisation:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrganisation();
        }
    }, [organisationId]);

    if (loading) {
        return <Loading />;
    }

    if (!organisation) {
        return <div>Organisation not found</div>;
    }

    const organisationInfoData = [
        { title: 'Name', content: organisation.name },
        { title: 'Email', content: <a href={`mailto:${organisation.email}`}>{organisation.email}</a> },
        { title: 'Phone', content: <a href={`tel:${organisation.phone}`}>{organisation.phone}</a> },
        { title: 'Website', content: <a href={organisation.website} target="_blank" rel="noopener noreferrer">{organisation.website}</a> },
        { title: 'Industry', content: organisation.industry },
        { title: 'City', content: organisation.city },
        { title: 'State', content: organisation.state },
        { title: 'Country', content: organisation.country },
        { title: 'Registration Number', content: organisation.registration_number },
        { title: 'Tax ID', content: organisation.tax_id },
    ];

    return (
        <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
            <div className="card card-body lead-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                        <span className="d-block mb-2">Organisation Information :</span>
                        <span className="fs-12 fw-normal text-muted d-block">Following information for your organisation</span>
                    </h5>
                </div>
                {organisationInfoData.map((data, index) => (
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

export default OrganisationsViewContent;