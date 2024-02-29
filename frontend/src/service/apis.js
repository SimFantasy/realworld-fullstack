import fetcher from './fetcher'

const User = {
  register: async user => await fetcher.post('/users', { user }),
  login: async user => await fetcher.post('/users/login', { user }),
  view: async () => await fetcher.get('/user'),
  update: async user => await fetcher.put('/user', { user })
}

const Profile = {
  view: async username => await fetcher(`/profiles/${username}`),
  follow: async username => await fetcher.post(`/profiles/${username}/follow`),
  unfollow: async username => await fetcher.delete(`/profiles/${username}/follow`)
}

const Article = {
  feed: async params => await fetcher('/articles', { params: { ...params } }),
  all: async params => await fetcher('/articles', { params: { ...params } }),
  create: async article => await fetcher.post('/articles', { article }),
  view: async slug => await fetcher(`/articles/${slug}`),
  update: async (slug, article) => await fetcher.put(`/articles/${slug}`, { article }),
  remove: async slug => await fetcher.delete(`/articles/${slug}`)
}

const Comment = {
  all: async url => await fetcher(url),
  create: async (slug, body) =>
    await fetcher.post(`/articles/${slug}/comments`, { comment: { body } }),
  delete: async (slug, id) => await fetcher.delete(`/articles/${slug}/comments/${id}`)
}

const Favorite = {
  favorite: async slug => await fetcher.post(`/articles/${slug}/favorite`),
  unfavorite: async slug => await fetcher.delete(`/articles/${slug}/favorite`)
}

const Tag = {
  tags: async () => await fetcher('/tags')
}

export default { User, Profile, Article, Comment, Favorite, Tag }
