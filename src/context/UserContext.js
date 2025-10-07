'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { BASE_URL } from '@/utils/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const fetchUsers = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/users?module_id=3&action=read`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await res.json();
                    if (result.success) {
                        setUsers(result.data);
                    }
                } catch (error) {
                    console.error("Error fetching users:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ users, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UserContext);
};