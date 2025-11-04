'use client'
import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import TextArea from '@/components/shared/TextArea'
import { customerListTagsOptions, leadsGroupsOptions, leadsSourceOptions, leadsStatusOptions, propsalVisibilityOptions, taskAssigneeOptions } from '@/utils/options'
import { createLead, bulkImportLeads } from '@/contentApi/leadApi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import useLocationData from '@/hooks/useLocationData'
import { currencyOptionsData } from '@/utils/fackData/currencyOptionsData'
import { languagesData } from '@/utils/fackData/languagesData'
import { timezonesData } from '@/utils/fackData/timeZonesData'
import Loading from '@/components/shared/Loading'
import Input from '@/components/shared/Input'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import MultiSelectTags from '@/components/shared/MultiSelectTags'




const MySwal = withReactContent(Swal);
const LeadsCreateContent = () => {
    const router = useRouter();
    const { countries, states, cities, loading, error, fetchStates, fetchCities, } = useLocationData();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: 'new',
        notes: '',
    });

    const [csvFile, setCsvFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const leadData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            status: formData.status,
            notes: formData.notes,
        };
        try {
            const result = await createLead(leadData);
            if (result.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message,
                });
                router.push('/leads/list');
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error("Error creating lead:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create lead.',
            });
        }
    }

    const handleFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return setCsvFile(null);
        // basic validation for csv by extension or mime
        if (f.type !== 'text/csv' && !f.name.toLowerCase().endsWith('.csv')) {
            MySwal.fire({
                icon: 'error',
                title: 'Invalid file',
                text: 'Please select a CSV file.'
            });
            e.target.value = null;
            return setCsvFile(null);
        }
        setCsvFile(f);
    }

    const handleUploadCsv = async () => {
        if (!csvFile) {
            MySwal.fire({ icon: 'warning', title: 'No file', text: 'Please choose a CSV file to upload.' });
            return;
        }
        setUploading(true);
        try {
            const result = await bulkImportLeads(csvFile);
            if (result && result.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Import Completed',
                    text: result.message || 'Bulk import completed.'
                });
                // optionally redirect to leads list to view imported leads
                router.push('/leads/list');
            } else {
                MySwal.fire({ icon: 'error', title: 'Import failed', text: (result && result.message) || 'Bulk import failed.' });
            }
        } catch (error) {
            console.error('Bulk import error:', error);
            MySwal.fire({ icon: 'error', title: 'Error', text: 'Failed to upload CSV.' });
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="col-lg-12">
            <div className="card stretch stretch-full">
                <div className="card-body">
                    {/* CSV bulk upload */}
                    <div className="mb-4">
                        <label className="form-label">Upload leads via CSV</label>
                        <div className="d-flex align-items-center gap-2">
                            <input type="file" accept=".csv,text/csv" onChange={handleFileChange} />
                            <button type="button" className="btn btn-secondary" onClick={handleUploadCsv} disabled={uploading || !csvFile}>
                                {uploading ? 'Uploading...' : 'Upload CSV'}
                            </button>
                            {csvFile && <small className="text-muted">{csvFile.name}</small>}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    label="First Name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Last Name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label="Email"
                                    name="email"
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
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    placeholder="Enter status"
                                />
                            </div>
                            <div className="col-lg-12">
                                <TextArea
                                    label="Notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Enter notes"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">Create Lead</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LeadsCreateContent