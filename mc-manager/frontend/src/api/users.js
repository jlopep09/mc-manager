const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function syncUser(accessToken, email, username) {
    const params = new URLSearchParams({
        email,
        username
    });
    

    const response = await fetch(`${API_URL}/v1/users/sync?${params}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al sincronizar el usuario: " + response.status);
    }

    return response.json();
}

export async function getUserData(accessToken) {

    const response = await fetch(`${API_URL}/v1/users/data`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al recuperar los datos del usuario: " + response.status);
    }

    return response.json();
}
