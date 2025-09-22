'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/shared/Loading';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { isAuthenticated, user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (user === undefined) return;
            if (!isAuthenticated) {
                router.replace('/authentication/login/cover');
            }
        }, [isAuthenticated, router, user]);

        if (user === undefined) {
            return <Loading />;
        }
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        }
        return null
    };
    return Wrapper;
};

export default withAuth;
