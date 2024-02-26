const monggose = require('@app/db')
const { User } = require('@model')

const { Schema, model } = monggose

const commentSchema = new Schema(
	{
		body: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		article: {
			type: Schema.Types.ObjectId,
			ref: 'Article'
		}
	},
	{
		timestamps: true
	}
)

commentSchema.methods.toCommentJson = async function (user) {
	const author = await User.findById(this.author)
	return {
		id: this._id,
		body: this.body,
		author: author.toProfileJson(user),
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	}
}

module.exports = model('Comment', commentSchema)
