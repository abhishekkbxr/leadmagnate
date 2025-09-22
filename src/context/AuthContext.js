'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const expiresAt = localStorage.getItem('expiresAt');

        if (storedToken && storedUser && expiresAt) {
            if (new Date().getTime() > expiresAt) {
                logout();
            } else {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const login = (userData, authToken, expiresAt) => {
        setUser(userData);
        setToken(authToken);
        const expirationTime = new Date(expiresAt).getTime();
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        localStorage.setItem('expiresAt', expirationTime);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        router.push('/authentication/login/cover');
    };

    const signup = async (name, email, phone, password) => {
        // In a real app, you'd make an API call here.
        console.log('Signing up with:', { name, email, phone, password });
        // Simulate a successful signup
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, signup, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
