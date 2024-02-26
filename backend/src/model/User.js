const mongoose = require('@app/db')
const handleMd5 = require('@utils/handleMd5')
const { jwtSign } = require('@utils/handleJwt')
const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true,
			set(val) {
				return handleMd5(val)
			}
		},
		bio: {
			type: String,
			default: ''
		},
		image: {
			type: String,
			default: '/images/default_avatar.jpg'
		},
		followingUsers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		favoriteArticles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Article'
			}
		]
	},
	{
		timesamps: true
	}
)

userSchema.methods.generateToken = function () {
	return jwtSign({
		id: this._id,
		username: this.username,
		email: this.email
	})
}

userSchema.methods.toUserJson = function () {
	return {
		username: this.username,
		email: this.email,
		bio: this.bio,
		image: this.image,
		token: this.generateToken()
	}
}

userSchema.methods.toProfileJson = function (user) {
	return {
		username: this.username,
		email: this.email,
		bio: this.bio,
		image: this.image,
		following: user ? user.isFollowing(this._id) : false
	}
}

userSchema.methods.isFollowing = function (id) {
	return this.followingUsers.some(userId => userId.toString() === id.toString())
}

userSchema.methods.follow = function (id) {
	const result = this.followingUsers.some(userId => userId.toString() === id.toString())
	if (!result) {
		this.followingUsers.push(id)
	}
	return this.save()
}

userSchema.methods.unFollow = function (id) {
	const result = this.followingUsers.some(userId => userId.toString() === id.toString())
	if (result) {
		this.followingUsers.remove(id)
	}
	return this.save()
}

userSchema.methods.isFavorite = function (id) {
	return this.favoriteArticles.some(articleId => articleId.toString() === id.toString())
}

userSchema.methods.favorite = function (id) {
	const result = this.favoriteArticles.some(articleId => articleId.toString() === id.toString())
	if (!result) {
		this.favoriteArticles.push(id)
	}
	return this.save()
}

userSchema.methods.unFavorite = function (id) {
	const result = this.favoriteArticles.some(articleId => articleId.toString() === id.toString())
	if (result) {
		this.favoriteArticles.remove(id)
	}
	return this.save()
}

module.exports = model('User', userSchema)
