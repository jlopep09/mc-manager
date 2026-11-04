import React from 'react'
import { Link } from 'react-router'

const Page404 = () => {
  return (
    <div className=" flex flex-col w-full min-h-lvh items-center justify-center align-middle justify-items-center">
       <div className='shadow-lg rounded-xl p-10 min-w-2xl flex flex-col items-center justify-center justify-items-center'>
        <p className='flex bold font-bold text-5xl'>404 Upsss...</p>
       <p className='flex text-2xl my-4'>No se ha encontrado esta página</p>
       <p className='flex text-md text-neutral-500 mb-4 max-w-sm text-center'>Puede que la dirección sea incorrecta o que el recurso no esté disponible en este momento</p>
       <Link to={"/"} className='btn btn-secondary text-neutral-50 text-xl' > Volver al inicio</Link>
       </div>
      </div>
  )
}

export default Page404