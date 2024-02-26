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
  feed: async (primaryKey, params) => await fetcher(primaryKey, { params: { ...params } }),
  all: async (primaryKey, params) => await fetcher(primaryKey, { params: { ...params } }),
  create: async article => await fetcher.post('/articles', { article }),
  view: async path => await fetcher(path),
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
  tags: async url => await fetcher(url)
}

export default { User, Profile, Article, Comment, Favorite, Tag }
