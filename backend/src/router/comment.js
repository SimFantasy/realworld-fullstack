const Router = require('@koa/router')
const auth = require('@middleware/auth')
const { getComments, createComment, removeComment } = require('@controller/comment')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/articles`
})

router.get('/:slug/comments', auth(false), getComments)

router.post('/:slug/comments', auth(), createComment)

router.delete('/:slug/comments/:commentId', auth(), removeComment)

module.exports = router
