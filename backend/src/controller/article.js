const articleService = require('@service/article')
const userService = require('@service/user')
const { createArticleValidator, updateArticleValidator } = require('@validator/article')

class articleController {
	// get articles
	async getArticles(ctx) {
		let skip = 0
		let limit = 10
		let query = {}

		if (ctx.query.limit) {
			limit = ctx.query.limit
		}

		if (ctx.query.skip) {
			skip = ctx.query.skip
		}

		if (ctx.query.tag) {
			query.tagList = { $in: [ctx.query.tag] }
		}

		if (ctx.query.author) {
			const author = await userService.getUserByName(ctx.query.author)
			if (author) {
				query.author = author._id.toString()
			} else {
				ctx.throw(400, { message: '用户不存在' })
			}
		}

		if (ctx.query.favorited) {
			const favoriter = await userService.getUserByName(ctx.query.favorited)

			if (favoriter) {
				query._id = { $in: favoriter.favoriteArticles }
			} else {
				ctx.throw(400, { message: '用户不存在' })
			}
		}

		const filterArticle = await articleService.getArticles(skip, limit, query)
		const articlesCount = await articleService.getArticlesCount(query)

		if (ctx.user) {
			const loginUser = await userService.getUserByName(ctx.user._id.toString())

			ctx.body = {
				articles: await Promise.all(
					filterArticle.map(async article => article.toArticleJson(loginUser))
				),
				articlesCount
			}
		} else {
			ctx.body = {
				articles: await Promise.all(filterArticle.map(article => article.toArticleJson(false))),
				articlesCount
			}
		}
	}

	// get feed articles
	async getFeedArticles(ctx) {
		let limit = 10
		let skip = 0

		if (ctx.query.limit) {
			limit = ctx.query.limit
		}

		if (ctx.query.skip) {
			skip = ctx.query.skip
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())

		const filterArticles = await articleService.getArticles(skip, limit, {
			author: { $in: loginUser.followingUsers }
		})

		const articlesCount = await articleService.getArticlesCount({
			author: { $in: loginUser.followingUsers }
		})

		ctx.body = {
			articles: await Promise.all(filterArticles.map(article => article.toArticleJson(loginUser))),
			articlesCount
		}
	}

	// get article
	async getArticle(ctx) {
		const { slug } = ctx.params

		const article = await articleService.getArticleBySlug(slug)
		if (!article) {
			ctx.throw(404, '文章不存在')
		}

		if (ctx.user) {
			const loginUser = await userService.getUserById(ctx.user._id.toString())

			ctx.body = {
				article: await article.toArticleJson(loginUser)
			}
		} else {
			ctx.body = {
				article: await article.toArticleJson(false)
			}
		}
	}

	// create article
	async createArticle(ctx) {
		const { article } = ctx.request.body

		const articleValidator = await createArticleValidator(article)
		if (articleValidator) {
			ctx.throw(400, { message: articleValidator })
		}

		const { title, description, body, tagList } = article

		const titleExist = await articleService.getArticleByTitle(title)
		if (titleExist) {
			ctx.throw(400, '文章标题已存在')
		}

		const author = await userService.getUserById(ctx.user._id.toString())

		const newArticle = await articleService.createArticle({ title, description, body })

		newArticle.author = author

		if (Array.isArray(tagList) && tagList.length > 0) {
			newArticle.tagList = tagList
		}

		await newArticle.save()

		ctx.body = {
			article: await newArticle.toArticleJson(author)
		}
	}

	// update article
	async updateArticle(ctx) {
		const { slug } = ctx.params
		const { article } = ctx.request.body

		const articleValidator = await updateArticleValidator(article)
		if (articleValidator) {
			ctx.throw(400, { message: articleValidator })
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())

		const target = await articleService.getArticleBySlug(slug)
		if (!target) {
			ctx.throw(404, '文章不存在')
		}

		if (article.title) {
			target.title = article.title
		}

		if (article.description) {
			target.description = article.description
		}

		if (article.body) {
			target.body = article.body
		}

		if (article.tagList) {
			target.tagList = article.tagList
		}

		await target.save()

		ctx.body = {
			article: await target.toArticleJson(loginUser)
		}
	}

	// remove article
	async removeArticle(ctx) {
		const { slug } = ctx.params

		const target = await articleService.getArticleBySlug(slug)
		if (!target) {
			ctx.throw(404, '文章不存在')
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())
		if (target.author.toString() !== loginUser._id.toString()) {
			ctx.throw(403, '无权限')
		}

		await target.deleteOne({ slug })

		ctx.body = {
			code: 201,
			message: '删除成功'
		}
	}

	// favorite article
	async favoriteArticle(ctx) {
		const { slug } = ctx.params

		const article = await articleService.getArticleBySlug(slug)
		if (!article) {
			ctx.throw(404, '文章不存在')
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())

		await loginUser.favorite(article._id)

		const updateArticle = await article.updateFavoitesCount()

		ctx.body = {
			article: await updateArticle.toArticleJson(loginUser)
		}
	}

	// unFavorite article
	async unFavoriteArticle(ctx) {
		const { slug } = ctx.params

		const article = await articleService.getArticleBySlug(slug)
		if (!article) {
			ctx.throw(404, '文章不存在')
		}

		const loginUser = await userService.getUserById(ctx.user._id.toString())

		await loginUser.unFavorite(article._id)

		const updateArticle = await article.updateFavoitesCount()

		ctx.body = {
			article: await updateArticle.toArticleJson(loginUser)
		}
	}
}

module.exports = new articleController()
