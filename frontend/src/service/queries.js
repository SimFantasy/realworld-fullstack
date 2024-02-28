import { createQuery } from 'react-query-kit'
import apis from '@/service/apis'

export const useCurrentUser = createQuery({
  queryKey: ['currentUser'],
  fetcher: async () => await apis.User.view()
})

export const useTags = createQuery({
  queryKey: ['tags'],
  fetcher: async () => await apis.Tag.tags()
})

export const useArticles = createQuery({
  queryKey: ['articles'],
  fetcher: async params => await apis.Article.all(params)
})
