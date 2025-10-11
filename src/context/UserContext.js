'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getUsers } from '@/contentApi/userApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        if (token) {
            try {
                setLoading(true);
                const result = await getUsers();
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
    }, [token]);

    return (
        <UserContext.Provider value={{ users, loading, refreshUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UserContext);
};