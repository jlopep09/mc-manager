
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import UserBalance from '../components/common/UserBalance'
import LogoutBtn from '../components/common/LogoutBtn'
import CommonPopup from '../components/common/CommonPopup'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (!isAuthenticated) {
    return <p>Inicia sesión para ver tu perfil.</p>
  }

  return (
    <div className="flex flex-col w-full pt-4 h-full justify-start mb-28">
      <ProfileImg
        url="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
      />
      <ProfileTitle textToDisplay={user?.email} />
      <div className='flex flex-row w-full justify-center px-2 py-2'>
        <div className='w-full max-w-sm'><LogoutBtn IsBtn={true}></LogoutBtn></div>
      </div>

    </div>
  )
}

const ProfileImg = ({ url }) => {
  return (
    <div className="avatar">
      <div className="w-48 rounded">
        <img
          alt="Avatar del perfil"
          src={url}
        />
      </div>
    </div>
  )
}

const ProfileTitle = ({ textToDisplay }) => {
  return (
    <div className="flex flex-row w-full justify-center py-2">
      <p className="font-bold">{textToDisplay}</p>
    </div>
  )
}

export default Profile
