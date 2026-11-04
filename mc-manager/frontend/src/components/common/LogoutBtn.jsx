import { useAuth0 } from "@auth0/auth0-react";

const LogoutBtn = ({IsBtn}) => {
    const {
    logout: auth0Logout, 
  } = useAuth0();

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });


  return (
    <>
      {!IsBtn && (
        <a className='w-full' onClick={logout}>Cerrar sesión</a>
      )}
      {IsBtn && (
        <button className='w-full btn btn-primary' onClick={logout}>Cerrar sesión</button>
      )}
    </>
  )
}

export default LogoutBtn


