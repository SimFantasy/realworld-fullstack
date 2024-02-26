const { getUserById } = require('@service/user')
const { jwtVerify } = require('@utils/handleJwt')

module.exports = (required = true) => {
	return async (ctx, next) => {
		const { authorization = '' } = ctx.request.headers

		if (!authorization) {
			if (required) {
				ctx.throw(401, { message: '请先登录' })
			} else {
				await next()
			}
		} else {
			try {
				const token = authorization.replace('Bearer ', '')
				const user = await jwtVerify(token)
				ctx.user = await getUserById(user.id.toString())
				await next()
			} catch (error) {
				console.log('Verify token error: ', error)
				ctx.throw(401, { message: error || 'token无效' })
			}
		}
	}
}
