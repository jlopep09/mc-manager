const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getServiceStatus(accessToken) {

    const response = await fetch(`${API_URL}/v1/manager/status`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al recuperar los datos del servicio: " + response.status);
    }

    return response.json();
}
