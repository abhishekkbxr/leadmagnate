'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/shared/Loading';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { isAuthenticated, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.replace('/authentication/login/cover');
            }
        }, [isAuthenticated, loading, router]);

        if (loading) {
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
