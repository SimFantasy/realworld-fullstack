const userService = require('@service/user')

class profileController {
	// get user profile
	async getProfile(ctx) {
		const { username } = ctx.params

		const user = await userService.getUserByName(username)
		if (!user) {
			ctx.throw(404, { message: '用户不存在' })
		}

		if (ctx.user) {
			const loginUser = await userService.getUserById(ctx.user._id.toString())
			ctx.body = {
				user: await user.toProfileJson(loginUser)
			}
		} else {
			ctx.body = {
				user: await user.toProfileJson(false)
			}
		}
	}

	// follow user
	async followUser(ctx) {
		const { username } = ctx.params

		const user = await userService.getUserByName(username)
		if (!user) {
			ctx.throw(404, { message: '用户不存在' })
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())
		await loginUser.follow(user._id.toString())

		ctx.body = {
			profile: await user.toProfileJson(loginUser)
		}
	}

	// unfollow user
	async unFollowUser(ctx) {
		const { username } = ctx.params

		const user = await userService.getUserByName(username)
		if (!user) {
			ctx.throw(404, { message: '用户不存在' })
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())
		await loginUser.unFollow(user._id.toString())

		ctx.body = {
			profile: await user.toProfileJson(loginUser)
		}
	}
}

module.exports = new profileController()
