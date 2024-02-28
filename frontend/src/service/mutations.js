import { createMutation } from 'react-query-kit'
import apis from '@/service/apis'

export const useRegister = createMutation({
  mutationFn: async user => await apis.User.register(user)
})

export const useLogin = createMutation({
  mutationFn: async user => await apis.User.login(user)
})

export const useCreateArticle = createMutation({
  mutationFn: async article => await apis.Article.create(article)
})
