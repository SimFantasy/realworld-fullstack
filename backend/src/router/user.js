const Router = require('@koa/router')
const { register, login, getCurrentUser, updateCurrentUser } = require('@controller/user')
const auth = require('@middleware/auth')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}`
})

router.post('/users', register)

router.post('/users/login', login)

router.get('/user', auth(), getCurrentUser)

router.put('/user', auth(), updateCurrentUser)

module.exports = router
