import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserData } from "../api/users";

export function useUserData() {
    const {
        user,
        isAuthenticated,
        isLoading: authLoading,
        getAccessTokenSilently,
    } = useAuth0();

    const [userData, setUserData] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated || !user?.sub) {
            setUserData(null);
            setError(null);
            setIsSyncing(false);
            return;
        }

        let cancelled = false;

        async function loadUserData() {
            setIsSyncing(true);
            setUserData(null);
            setError(null);

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    },
                });

                const data = await getUserData(accessToken);

                if (!cancelled) {
                    setUserData(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setIsSyncing(false);
                }
            }
        }

        loadUserData();

        return () => {
            cancelled = true;
        };
    }, [
        authLoading,
        isAuthenticated,
        user?.sub,
        getAccessTokenSilently,
    ]);

    return {
        userData,
        isLoading: authLoading || isSyncing,
        error,
    };
}