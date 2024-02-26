import { useMatch } from 'react-router-dom'
import { Login, Register } from '@/components'

const Auth = () => {
  const isLogin = useMatch('/login')?.pathname.includes('login')
  return isLogin ? <Login /> : <Register />
}

export default Auth
