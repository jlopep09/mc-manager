import React from 'react'
import { Navbar } from './Navbar'
import Footer from './Footer'

const CommonLayout = ({children}) => {
  return (
    <>
        <div className='flex flex-col justify-between min-h-lvh'>
          <Navbar></Navbar>
          <div className='flex flex-row w-full justify-center'>
            <div className='block w-full max-w-7xl '>
              {children}
            </div>
          </div>
          <Footer> </Footer>
        </div>
    </>
  )
}

export default CommonLayout