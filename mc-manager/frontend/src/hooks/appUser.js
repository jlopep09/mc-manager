
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { syncUser } from "../api/users";

export function useAppUser() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [appUser, setAppUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user?.sub) {
      setAppUser(null);
      setError(null);
      setIsSyncing(false);
      return;
    }

    let cancelled = false;

    async function loadAppUser() {
      setIsSyncing(true);
      setError(null);

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const profile = await syncUser(accessToken, user?.email, user?.name);

        if (!cancelled) {
          setAppUser(profile);
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

    loadAppUser();

    return () => {
      cancelled = true;
    };
  }, [
    authLoading,
    isAuthenticated,
    user?.sub,
    getAccessTokenSilently,
    user?.email,
    user?.name,
  ]);

  return {
    appUser,
    isLoading: authLoading || isSyncing,
    error,
  };
}
