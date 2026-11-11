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

export async function changeServiceStatus(accessToken, newStatus) {

    if(newStatus === true){
        return startService(accessToken)
    }else if (newStatus === false){
        return stopService(accessToken)   
    }else{
        throw new Error("Estado no válido.");
    }
}

async function startService(accessToken) {

    const response = await fetch(`${API_URL}/v1/manager/on`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al iniciar el servicio: " + response.status);
    }

    return response.json();
}
async function stopService(accessToken) {

    const response = await fetch(`${API_URL}/v1/manager/off`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al iniciar el servicio: " + response.status);
    }

    return response.json();
}
