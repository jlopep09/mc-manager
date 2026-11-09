import { useAuth0 } from "@auth0/auth0-react";
import { useAppUser } from "./../hooks/appUser";
import { useUserData } from "../hooks/userData";
import ActionsGrid from "../components/App/ActionsGrid";
import { Link } from "react-router";



function App() {
    const {
    isLoading, 
    isAuthenticated

  } = useAuth0();

  const {appUser, isLoading: isAppUserLoading} = useAppUser();
  const {userData} = useUserData();

  if (!appUser && !isAppUserLoading && isAuthenticated) {
    return <p className="justify-center text-center my-8 ">No hay un perfil disponible.</p>;
  }

  return (
    <>
      {isLoading && (
        <div className="w-full "><p className="justify-center text-center my-8 ">Cargando...</p></div>
      
      )}
      {!isAuthenticated && !isAppUserLoading && (
        <div className="w-full "><p className="justify-center text-center my-8 ">Inicie sesión para poder usar la aplicación</p></div>
      )}
      {(!isLoading && isAuthenticated) && (
        <>
          {userData?.hasAdminRole && (
            <Link to={"/dashboard"} className="btn btn-secondary">Gestión</Link>
          
          )}
          {!userData?.hasAdminRole && (
            <div className="grid grid-cols-1 justify-items-center">
            <div>No tienes permisos para acceder a esta página</div>
          </div>
          )}
          
        </>
      )}
    </>
  )
}

export default App
