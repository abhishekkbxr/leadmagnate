import React from 'react';

const Select = ({ label, name, value, onChange, options, required }) => {
    return (
        <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
                <label className="fw-semibold">{label}: </label>
            </div>
            <div className="col-lg-8">
                <select
                    className="form-select"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Select;
