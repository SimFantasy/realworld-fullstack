import { createQuery } from 'react-query-kit'
import apis from '@/service/apis'

export const useCurrentUser = createQuery({
  queryKey: ['currentUser'],
  fetcher: async () => await apis.User.view()
})
