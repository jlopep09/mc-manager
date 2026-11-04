import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'

const UserBalance = () => {

  const [UserBalance, setBalance] = useState(0)
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0()


  useEffect(() => {
  
      async function loadUserBalance() {
  
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
          const API_URL = import.meta.env.VITE_BACKEND_URL
          const response = await fetch(`${API_URL}/v1/bank/`, {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });

          if (!response.ok) {
              throw new Error("Error al obtener el balance del usuario: " + response.status);
          }else{
            const data = await response.json();

            setBalance(data.coins)
            
          }

        } catch (err) {
          console.log(err.message) ;
        }
      }
  
      loadUserBalance();
  
      
    }, [
      isAuthenticated,
      user?.sub,
      getAccessTokenSilently,
    ]);
  

  return (
    <div className='flex flex-row justify-center items-center btn btn-dash px-3 pr-2'>
        <p className='pr-1'>{UserBalance}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#998500" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-pound-sterling preview-icon"><circle cx="12" cy="12" r="10"/><path d="M10 16V9.5a1 1 0 0 1 5 0"/><path d="M8 12h4"/><path d="M8 16h7"/></svg>
    </div>
  )
}

export default UserBalance