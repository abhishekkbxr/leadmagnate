'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { BASE_URL } from '@/utils/api';

const OrganisationContext = createContext();

export const OrganisationProvider = ({ children }) => {
    const { token } = useAuth();
    const [organisations, setOrganisations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const fetchOrganisations = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/organisations?module_id=3&action=read`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await res.json();
                    if (result.success) {
                        setOrganisations(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching organisations:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrganisations();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <OrganisationContext.Provider value={{ organisations, loading }}>
            {children}
        </OrganisationContext.Provider>
    );
};

export const useOrganisations = () => {
    return useContext(OrganisationContext);
};