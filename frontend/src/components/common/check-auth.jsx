import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks'

const CheckAuth = ({ children }) => {
  const isAuth = useAuth(state => state.isAuth)

  return isAuth ? <>{children}</> : <Navigate to='/login' />
}

export default CheckAuth
