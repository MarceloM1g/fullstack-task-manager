import { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }, [navigate]);

    return (
        <Layout>
            <h1 className="min-h-screen flex items-center justify-center">Seu Perfil</h1>
        </Layout>
    );
}

export default Profile;