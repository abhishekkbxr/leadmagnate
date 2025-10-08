'use client'
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getOrganisations } from '@/contentApi/organisationApi';

const OrganisationContext = createContext();

export const OrganisationProvider = ({ children }) => {
    const { token } = useAuth();
    const [organisations, setOrganisations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrganisations = useCallback(async () => {
        if (token) {
            try {
                setLoading(true);
                const result = await getOrganisations();
                if (result.success) {
                    setOrganisations(result.data);
                }
            } catch (error) {
                console.error("Error fetching organisations:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [token]);

    const refreshOrganisations = () => {
        fetchOrganisations();
    };

    useEffect(() => {
        if (token) {
            fetchOrganisations();
        } else {
            setLoading(false);
        }
    }, [token, fetchOrganisations]);

    return (
        <OrganisationContext.Provider value={{ organisations, loading, refreshOrganisations }}>
            {children}
        </OrganisationContext.Provider>
    );
};

export const useOrganisations = () => {
    return useContext(OrganisationContext);
};