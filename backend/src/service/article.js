const { Article, Tag } = require('@model')

class articleService {
	// get articles
	async getArticles(skip, limit, query) {
		return await Article.find(query).skip(skip).limit(limit).sort({ _id: -1 })
	}

	// get articles counts
	async getArticlesCount(query) {
		return await Article.countDocuments(query)
	}

	// get article by slug
	async getArticleBySlug(slug) {
		return await Article.findOne({ slug })
	}

	// get article by title
	async getArticleByTitle(title) {
		return await Article.findOne({ title })
	}

	// create article
	async createArticle(article) {
		return await Article.create(article)
	}

	// get article tag
	async getTags() {
		return await Article.find().distinct('tagList')
	}
}

module.exports = new articleService()
