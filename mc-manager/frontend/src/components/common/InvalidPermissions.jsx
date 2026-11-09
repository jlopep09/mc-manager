import React from 'react'
import { Link } from 'react-router'

const InvalidPermissions = () => {
  return (
    <div className=" flex flex-col w-full min-h-lvh items-center justify-center align-middle justify-items-center">
       <div className='shadow-lg rounded-xl p-10 min-w-2xl flex flex-col items-center justify-center justify-items-center'>
        <p className='flex bold font-bold text-5xl'>Upsss...</p>
       <p className='flex text-2xl my-4'>No tienes permisos para acceder a esta página</p>
       <Link to={"/"} className='btn btn-secondary text-neutral-50 text-xl' > Volver al inicio</Link>
       </div>
      </div>
  )
}

export default InvalidPermissions