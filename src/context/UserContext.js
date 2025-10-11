'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getUsers, getUsersByOrganisation } from '@/contentApi/userApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrganisation, setSelectedOrganisation] = useState(null);

    const fetchUsers = async () => {
        if (token) {
            try {
                setLoading(true);
                let result;
                if (selectedOrganisation) {
                    result = await getUsersByOrganisation(selectedOrganisation);
                } else {
                    result = await getUsers();
                }
                if (result.success) {
                    setUsers(result.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const refreshUsers = () => {
        fetchUsers();
    };

    useEffect(() => {
        if (token) {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [token, selectedOrganisation]);

    return (
        <UserContext.Provider value={{ users, loading, refreshUsers, selectedOrganisation, setSelectedOrganisation }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UserContext);
};