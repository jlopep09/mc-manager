import React, { useState } from 'react'
import { useManagerStatus } from '../../hooks/managerStatus';
import { changeServiceStatus } from '../../api/manager';
import { useAuth0 } from '@auth0/auth0-react';

const ActionsGrid = () => {
  
  const serviceActiveClasses = "btn btn-success"
  const serviceInactiveClasses = "btn btn-error"
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();

  async function refreshStatus(){
    setRefreshTrigger(!refreshTrigger);
  }
  async function turnOnService(){
    if(!isAuthenticated){return}
    
    const accessToken = await getAccessTokenSilently({
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    });
    
    await changeServiceStatus(accessToken, true)
  }
  async function turnOffService(){
    if(!isAuthenticated){return}

    const accessToken = await getAccessTokenSilently({
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    });
    changeServiceStatus(accessToken, false)
  }

  const { serviceData } = useManagerStatus(refreshTrigger);
  return (
    <div className='flex flex-col py-5 gap-3'>
        <button onClick={refreshStatus} className={
              'btn ' + (serviceData?.success === true
                  ? serviceActiveClasses
                  : serviceInactiveClasses)
          }>Obtener estado del servicio
        </button>
        <button className='btn btn-secondary' onClick={turnOnService}> Encender servicio </button>
        <button className='btn btn-secondary' onClick={turnOffService}> Apagar servicio </button>
        <button className='btn btn-secondary'> Crear backup </button>
    </div>
  )
}

export default ActionsGrid