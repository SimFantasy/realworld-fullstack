import { createWithEqualityFn } from 'zustand/traditional'
import computed from 'zustand-computed'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { isEmpty } from 'lodash-es'
import { JWT_KEY } from '@/constants/config'

const getAuthUser = () => {
  const jwt = localStorage.getItem(JWT_KEY)
  if (!jwt) return {}
  return JSON.parse(jwt)
}

const authState = state => ({
  isAuth: !isEmpty(state.authUser)
})

const useAuth = createWithEqualityFn(
  computed(
    immer(set => ({
      authUser: getAuthUser(),
      login: user =>
        set(state => {
          localStorage.setItem(JWT_KEY, JSON.stringify(user))
          return {
            authUser: user
          }
        }),
      logout: () =>
        set(state => {
          localStorage.removeItem(JWT_KEY)
          return {
            authUser: {}
          }
        }),
      checkAuth: () =>
        set(state => {
          const authUser = state.authUser
          if (!authUser || authUser === '') {
            state.logou()
          }
        })
    })),
    authState
  ),
  shallow
)

export default useAuth
