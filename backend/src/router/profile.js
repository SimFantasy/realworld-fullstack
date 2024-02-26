const Router = require('@koa/router')
const auth = require('@middleware/auth')
const { getProfile, followUser, unFollowUser } = require('@controller/profile')
const router = new Router({
	prefix: `${process.env.ROUTER_PREFIX}/profiles`
})

router.get('/:username', auth(), getProfile)

router.post('/:username/follow', auth(), followUser)

router.delete('/:username/follow', auth(), unFollowUser)

module.exports = router
