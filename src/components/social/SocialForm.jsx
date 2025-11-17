'use client'
import React, { useState, useEffect } from 'react'
import Input from '@/components/shared/Input'
import { createSocialConfig, getSocialConfigById, updateSocialConfig } from '@/contentApi/socialApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const MySwal = withReactContent(Swal);

const SocialForm = ({ socialId }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        ads_name: '',
        page_id: '',
        page_access_token: '',
        webhook_verify_token: 'leadmagnate_webhook',
        is_active: 1,
    });

    useEffect(() => {
        if (socialId) {
            const fetchSocialConfig = async () => {
                try {
                    const config = await getSocialConfigById(socialId);
                    setFormData({
                        ads_name: config.ads_name,
                        page_id: config.page_id,
                        page_access_token: config.page_access_token,
                        webhook_verify_token: config.webhook_verify_token,
                        is_active: config.is_active,
                    });
                } catch (error) {
                    MySwal.fire('Failed!', 'Failed to fetch social configuration details.', 'error');
                }
            };
            fetchSocialConfig();
        }
    }, [socialId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const socialData = {
            ...formData,
            organisation_id: user.organisation_id,
        };

        try {
            if (socialId) {
                await updateSocialConfig(socialId, socialData);
                MySwal.fire('Updated!', 'The social configuration has been updated.', 'success');
            } else {
                await createSocialConfig(socialData);
                MySwal.fire('Created!', 'The social configuration has been created.', 'success');
            }
            router.push('/social/list');
        } catch (error) {
            MySwal.fire('Failed!', `Failed to ${socialId ? 'update' : 'create'} the social configuration.`, 'error');
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
                                    label="Ads Name"
                                    name="ads_name"
                                    value={formData.ads_name}
                                    onChange={handleChange}
                                    placeholder="Enter ads name"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Page ID"
                                    name="page_id"
                                    value={formData.page_id}
                                    onChange={handleChange}
                                    placeholder="Enter page ID"
                                    required
                                />
                            </div>
                            <div className="col-lg-12">
                                <Input
                                    label="Page Access Token"
                                    name="page_access_token"
                                    value={formData.page_access_token}
                                    onChange={handleChange}
                                    placeholder="Enter page access token"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Webhook Verify Token"
                                    name="webhook_verify_token"
                                    value={formData.webhook_verify_token}
                                    onChange={handleChange}
                                    placeholder="Enter webhook verify token"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label">Status</label>
                                <select
                                    name="is_active"
                                    value={formData.is_active}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">{socialId ? 'Update' : 'Create'} Social Configuration</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SocialForm;