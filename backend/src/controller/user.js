const userService = require('@service/user')
const { registerValidator, loginValidator, updateCurrentUserValidator } = require('@validator/user')
const handleMd5 = require('@utils/handleMd5')

class UserController {
	// register
	async register(ctx) {
		const { user } = ctx.request.body
		console.log('user', user)

		const userValidator = await registerValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const nameExists = await userService.getUserByName(user.username)
		if (nameExists) {
			ctx.throw(400, { message: '用户名已存在' })
		}

		const emailExists = await userService.getUserByEmail(user.email)
		if (emailExists) {
			ctx.throw(400, { message: '邮箱已存在' })
		}

		const newUser = await userService.createUser(user)

		ctx.body = {
			user: await newUser.toUserJson()
		}
	}

	// login
	async login(ctx) {
		const { user } = ctx.request.body
		console.log('user', user)

		const userValidator = await loginValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const userExists = await userService.getUserByEmail(user.email)
		if (!userExists) {
			ctx.throw(400, { message: '邮箱不存在' })
		}

		if (userExists.password !== handleMd5(user.password)) {
			ctx.throw(400, { message: '密码错误' })
		}

		ctx.body = {
			user: await userExists.toUserJson()
		}
	}

	// get current user
	async getCurrentUser(ctx) {
		const loginUser = ctx.user

		console.log('loginUser', loginUser)

		const userExists = await userService.getUserById(loginUser._id.toString())

		if (!userExists) {
			ctx.throw(404, { message: '用户不存在' })
		}

		ctx.body = {
			user: await userExists.toUserJson()
		}
	}

	// update current user
	async updateCurrentUser(ctx) {
		const { user } = ctx.request.body

		const userValidator = await updateCurrentUserValidator(user)
		if (userValidator) {
			ctx.throw(400, { message: userValidator })
		}

		const target = await userService.getUserById(ctx.user._id.toString())
		if (!target) {
			ctx.throw(400, { message: '用户不存在' })
		}

		if (user.username) {
			target.username = user.username
		}

		if (user.email) {
			target.email = user.email
		}

		if (user.password) {
			target.password = handleMd5(user.password)
		}

		if (typeof user.bio !== 'undefined') {
			target.bio = user.bio
		}

		if (typeof user.image !== 'undefined') {
			target.image = user.image
		}

		await target.save()

		ctx.body = {
			user: await target.toUserJson()
		}
	}
}

module.exports = new UserController()
