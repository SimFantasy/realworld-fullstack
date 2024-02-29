import { createQuery } from 'react-query-kit'
import apis from '@/service/apis'

export const useCurrentUser = createQuery({
  queryKey: ['/user'],
  fetcher: async () => await apis.User.view()
})

export const useTags = createQuery({
  queryKey: ['/tags'],
  fetcher: async () => await apis.Tag.tags()
})

export const useArticles = createQuery({
  queryKey: ['/articles'],
  fetcher: async variables => {
    const param = { ...variables, limit: variables.limit, offset: variables.offset }
    return await apis.Article.all(param)
  }
})

export const useFeedArticles = createQuery({
  queryKey: ['/articles/feed'],
  fetcher: async variables => {
    const param = { ...variables, limit: variables.limit, offset: variables.offset }
    return await apis.Article.feed(param)
  }
})

export const useArticle = createQuery({
  queryKey: ['/article'],
  fetcher: async variables => await apis.Article.view(variables.slug)
})
