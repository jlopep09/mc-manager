import React from 'react'

const ActionsGrid = () => {
  return (
    <div className='flex flex-col py-5 gap-3'>
        <button className='btn btn-secondary'> Obtener estado del servicio </button>
        <button className='btn btn-secondary'> Encender servicio </button>
        <button className='btn btn-secondary'> Apagar servicio </button>
        <button className='btn btn-secondary'> Crear backup </button>
    </div>
  )
}

export default ActionsGrid