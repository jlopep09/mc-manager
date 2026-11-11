import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { getServiceStatus } from '../api/manager';
import { getUserData } from '../api/users';


export function useManagerStatus(refreshTrigger) {

    const [serviceData, setServiceData] = useState();
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    useEffect(() =>{

        if(!isAuthenticated){return}


        async function  getUserDataUseEffect() {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });
            const result = await getServiceStatus(accessToken);
            setServiceData(result)
        }

        
        getUserDataUseEffect();


    },[refreshTrigger, isAuthenticated, user]

    );


    return {
        serviceData,
    };
}
