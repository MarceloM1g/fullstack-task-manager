import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {

    const token = localStorage.getItem('token');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(!!token);

    useEffect(() => {

        if (!token) return;

        async function validateToken() {
            try {
                const response = await fetch('http://localhost:3000/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsCheckingAuth(false);
            }
        }
        validateToken();
    }, [token]);

    if (isCheckingAuth) {
        return (
            <div>
                Carregando...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}