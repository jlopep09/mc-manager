import { useAuth0 } from '@auth0/auth0-react';

const LoginBtn = () => {

  const {
    loginWithRedirect: login,
  } = useAuth0();

  return (
    <button className='w-full btn btn-primary font-bold' onClick={login}>Registrarse</button>
  )
}

export default LoginBtn