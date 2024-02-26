const mongoose = require('@app/db')
const slugify = require('slugify')
const { User } = require('@model')

const { Schema, model } = mongoose

const articleSchema = new Schema(
	{
		slug: {
			type: String,
			unique: true,
			required: true,
			index: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		tagList: [{ type: String }],
		author: {
			type: Schema.Types.ObjectId,
			ref: User
		},
		favoritesCount: {
			type: Number,
			default: 0
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	},
	{
		timestamps: true
	}
)

articleSchema.pre('validate', function (next) {
	this.slug = slugify(this.title, { lower: true, replacement: '-' })
	next()
})

articleSchema.methods.updateFavoitesCount = async function () {
	const favoritesCount = await User.countDocuments({
		favoriteArticles: {
			$in: [this._id]
		}
	})
	this.favoritesCount = favoritesCount
	return this.save()
}

articleSchema.methods.toArticleJson = async function (user) {
	const author = await User.findById(this.author)
	return {
		slug: this.slug,
		title: this.title,
		description: this.description,
		body: this.body,
		tagList: this.tagList,
		author: author.toProfileJson(user),
		favoritesCount: this.favoritesCount,
		favorited: user ? author.isFavorite(this._id) : false,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	}
}

articleSchema.methods.addComment = async function (commentId) {
	const result = await this.comments.some(
		comment => comment._id.toString() === commentId.toString()
	)
	if (!result) {
		this.comments.push(commentId)
	}
	return this.save()
}

articleSchema.methods.removeComment = async function (commentId) {
	const result = await this.comments.some(
		comment => comment._id.toString() === commentId.toString()
	)
	if (result) {
		this.comments.remove(commentId)
	}
	return this.save()
}

module.exports = model('Article', articleSchema)
