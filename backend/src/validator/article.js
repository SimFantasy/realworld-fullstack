const Joi = require('joi')
const handleValidator = require('@utils/handleValidator')

exports.createArticleValidator = async param => {
	const rules = {
		title: Joi.string().max(100).required().messages({
			'string.max': '标题最多为100个字符',
			'any.required': '标题不能为空'
		}),
		description: Joi.string().max(160).required().messages({
			'string.max': '简介最多为160个字符',
			'any.required': '简介不能为空'
		}),
		body: Joi.string().max(240000).required().messages({
			'string.max': '内容最多为240000个字符',
			'any.required': '内容不能为空'
		}),
		tagList: Joi.array().items(Joi.string()).messages({
			'items.string': '标签必须为字符串'
		})
	}

	return await handleValidator(param, rules)
}

exports.updateArticleValidator = async param => {
	const rules = {
		title: Joi.string().max(100).messages({
			'string.max': '标题长度不能超过100'
		}),
		description: Joi.string().max(160).messages({
			'string.max': '描述长度不能超过160'
		}),
		body: Joi.string().max(24000).messages({
			'string.max': '内容长度不能超过24000'
		}),
		tagList: Joi.array().items(Joi.string()).messages({
			'items.string': '标签格式错误'
		})
	}

	return await handleValidator(param, rules)
}
