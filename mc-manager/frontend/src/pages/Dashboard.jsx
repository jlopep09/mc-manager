import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserData } from "../hooks/userData";
import ActionsGrid from "../components/App/ActionsGrid";

const Dashboard = () => {
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useAuth0();
    const { userData, isLoading: isUserDataLoading, error } = useUserData();

    useEffect(() => {
        if (isLoading || isUserDataLoading) return;

        if (!isAuthenticated) {
            navigate("/", { replace: true });
            return;
        }

        // Esperamos a tener el resultado de la petición
        if (error) {
            navigate("/InvalidPermissions", { replace: true });
            return;
        }

        if (!userData) return;

        if (!userData.hasAdminRole) {
            navigate("/InvalidPermissions", { replace: true });
        }

    }, [
        isLoading,
        isAuthenticated,
        isUserDataLoading,
        userData,
        error,
        navigate
    ]);

    if (isLoading || isUserDataLoading || !userData) {
        return <p className="text-center my-8">Cargando...</p>;
    }

    if (!isAuthenticated || !userData.hasAdminRole) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 justify-items-center">
            <div className="text-2xl font-bold">
                Bienvenido {userData.username}
            </div>
            <ActionsGrid />
        </div>
    );
};

export default Dashboard;