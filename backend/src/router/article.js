const Router = require('@koa/router')
const auth = require('@middleware/auth')
const {
	getArticles,
	getFeedArticles,
	getArticle,
	createArticle,
	updateArticle,
	removeArticle,
	favoriteArticle,
	unFavoriteArticle
} = require('@controller/article')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/articles`
})

router.get('/', auth(false), getArticles)

router.get('/feed', auth(), getFeedArticles)

router.get('/:slug', auth(false), getArticle)

router.post('/', auth(), createArticle)

router.put('/:slug', auth(), updateArticle)

router.delete('/:slug', auth(), removeArticle)

router.post('/:slug/favorite', auth(), favoriteArticle)

router.delete('/:slug/favorite', auth(), unFavoriteArticle)

module.exports = router
