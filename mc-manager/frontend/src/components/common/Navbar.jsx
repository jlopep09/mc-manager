import React from 'react'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router';
import UserBalance from './UserBalance';

export const Navbar = () => {

   const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout, 
    user, 
  } = useAuth0();


  return (
    <div className="navbar items-center w-full align-middle justify-center">
      <div className='navbar flex w-full max-w-7xl bg-base-100  shadow-sm'>

      <div className="flex-1">
        <a href='/' className="btn btn-ghost text-xl">{import.meta.env.VITE_APP_NAME}</a>
      </div>
      <div className="flex gap-2">
    
    {isAuthenticated && !isLoading &&(
      <>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User icon"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow">
        <li className=''>
          <Link to={"/profile"} className="justify-between">
            <p >
              Profile
          
            </p>
          </Link>
          
        </li>
        <li ><LogoutBtn></LogoutBtn></li>
      </ul>
    </div>
    </>)}
    {!isAuthenticated && !isLoading &&(<LoginBtn></LoginBtn>)}
  </div>
          </div>
    </div>
  )
}
