const articleService = require('@service/article')

class tagController {
	// get tags
	async getTags(ctx) {
		const tags = await articleService.getTags()
		ctx.body = {
			tags
		}
	}
}

module.exports = new tagController()
