'use client'
import React from 'react'
import Image from 'next/image';
import Select from 'react-select'
const MultiSelectImg = ({ options, defaultSelect, placeholder }) => {
    return (
        <Select
            defaultValue={defaultSelect}
            isMulti
            placeholder={placeholder}
            name="assignee"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: state.hasValue ? '6px 12px' : '13px',
                }),
            }}
            hideSelectedOptions={false}
            isSearchable={false}
            formatOptionLabel={assignee => (
                <div className="user-option d-flex align-items-center gap-3">
                    <Image src={assignee.img} width={20} height={20} alt={assignee.label} className='avatar avatar-sm rounded-5' />
                    <span>{assignee.label}</span>
                </div>
            )}
        />
    )
}

export default MultiSelectImg