'use client'
import React, { useEffect, useState } from 'react'
import Input from '@/components/shared/Input'
import TextArea from '@/components/shared/TextArea'
import { getOrganisationById, updateOrganisation } from '@/contentApi/organisationApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import Loading from '@/components/shared/Loading'
import { useOrganisations } from '@/context/OrganisationContext'

const MySwal = withReactContent(Swal);

const OrganisationsEditContent = ({ organisationId }) => {
    const router = useRouter();
    const { refreshOrganisations } = useOrganisations();
    const [formData, setFormData] = useState({
        organisation_name: '',
        organisation_email: '',
        organisation_phone: '',
        organisation_website: '',
        organisation_city: '',
        organisation_state: '',
        organisation_country: '',
        organisation_industry: '',
        organisation_registration_number: '',
        organisation_tax_id: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (organisationId) {
            const fetchOrganisation = async () => {
                try {
                    const result = await getOrganisationById(organisationId);
                    if (result.success) {
                        const orgData = result.data;
                        setFormData({
                            organisation_name: orgData.name || '',
                            organisation_email: orgData.email || '',
                            organisation_phone: orgData.phone || '',
                            organisation_website: orgData.website || '',
                            organisation_city: orgData.city || '',
                            organisation_state: orgData.state || '',
                            organisation_country: orgData.country || '',
                            organisation_industry: orgData.industry || '',
                            organisation_registration_number: orgData.registration_number || '',
                            organisation_tax_id: orgData.tax_id || '',
                        });
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const organisationData = {
            name: formData.organisation_name,
            email: formData.organisation_email,
            phone: formData.organisation_phone,
            website: formData.organisation_website,
            city: formData.organisation_city,
            state: formData.organisation_state,
            country: formData.organisation_country,
            industry: formData.organisation_industry,
            registration_number: formData.organisation_registration_number,
            tax_id: formData.organisation_tax_id,
        };
        try {
            const result = await updateOrganisation(organisationId, organisationData);
            if (result.success) {
                await refreshOrganisations(); // Wait for refresh to complete
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message,
                });
                router.push('/organisations/list');
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error("Error updating organisation:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update organisation.',
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
                                    label="Organisation Name"
                                    name="organisation_name"
                                    value={formData.organisation_name}
                                    onChange={handleChange}
                                    placeholder="Enter organisation name"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Organisation Email"
                                    name="organisation_email"
                                    type="email"
                                    value={formData.organisation_email}
                                    onChange={handleChange}
                                    placeholder="Enter organisation email"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Organisation Phone"
                                    name="organisation_phone"
                                    value={formData.organisation_phone}
                                    onChange={handleChange}
                                    placeholder="Enter organisation phone"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Organisation Website"
                                    name="organisation_website"
                                    value={formData.organisation_website}
                                    onChange={handleChange}
                                    placeholder="Enter organisation website"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="City"
                                    name="organisation_city"
                                    value={formData.organisation_city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="State"
                                    name="organisation_state"
                                    value={formData.organisation_state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Country"
                                    name="organisation_country"
                                    value={formData.organisation_country}
                                    onChange={handleChange}
                                    placeholder="Enter country"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Industry"
                                    name="organisation_industry"
                                    value={formData.organisation_industry}
                                    onChange={handleChange}
                                    placeholder="Enter industry"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Registration Number"
                                    name="organisation_registration_number"
                                    value={formData.organisation_registration_number}
                                    onChange={handleChange}
                                    placeholder="Enter registration number"
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Tax ID"
                                    name="organisation_tax_id"
                                    value={formData.organisation_tax_id}
                                    onChange={handleChange}
                                    placeholder="Enter tax ID"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">Update Organisation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrganisationsEditContent;
