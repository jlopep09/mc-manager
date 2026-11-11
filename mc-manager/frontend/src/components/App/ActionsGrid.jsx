import React from 'react'
import { useManagerStatus } from '../../hooks/managerStatus';

const ActionsGrid = () => {
  const { serviceData } = useManagerStatus();
  const serviceActiveClasses = "btn btn-success"
  const serviceInactiveClasses = "btn btn-error"
  return (
    <div className='flex flex-col py-5 gap-3'>
        <button className={
              'btn ' + (serviceData?.success === true
                  ? serviceActiveClasses
                  : serviceInactiveClasses)
          }>Obtener estado del servicio
        </button>
        <button className='btn btn-secondary'> Encender servicio </button>
        <button className='btn btn-secondary'> Apagar servicio </button>
        <button className='btn btn-secondary'> Crear backup </button>
    </div>
  )
}

export default ActionsGrid