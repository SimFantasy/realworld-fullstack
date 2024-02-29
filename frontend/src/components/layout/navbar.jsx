import { NavLink } from 'react-router-dom'
import { RiLogoutBoxRLine, RiSettingsLine, RiPencilLine } from '@remixicon/react'
import { useAuth } from '@/hooks'
import { useCurrentUser } from '@/service/queries'

const NavBar = () => {
  const isAuth = useAuth(state => state.isAuth)
  const logout = useAuth(state => state.logout)

  const { data: currentUser } = useCurrentUser()

  return (
    <div className='flex gap-4 justify-end items-center navs'>
      <NavLink to='/home'>Home</NavLink>
      {isAuth && (
        <>
          <NavLink to='/settings'>
            <RiSettingsLine size={16} />
            Settings
          </NavLink>
          <NavLink to='/editor'>
            <RiPencilLine size={16} />
            Add Article
          </NavLink>
          <NavLink to='/profile/jacky' className='flex gap-2 items-center'>
            <img
              src={isAuth && (currentUser?.user.image ?? '/images/default_avatar.jpg')}
              alt='profile pic'
              className='w-8 h-8 rounded-full'
            />
            <div className='font-semibold'>{currentUser?.user.username}</div>
          </NavLink>
          <button className='bg-transparent border-0 outline-none' onClick={logout}>
            <RiLogoutBoxRLine size={18} stroke={1} className='text-gray-500' />
          </button>
        </>
      )}
      {!isAuth && (
        <>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </>
      )}
    </div>
  )
}

export default NavBar
