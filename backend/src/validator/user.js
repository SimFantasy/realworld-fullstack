const Joi = require('joi')
const handleValidator = require('@utils/handleValidator')

exports.registerValidator = async param => {
	const rules = {
		username: Joi.string().min(3).max(24).required().messages({
			'string.min': '用户名最少3个字符',
			'string.max': '用户名最多24个字符',
			'string.required': '用户名不能为空'
		}),
		email: Joi.string().email().required().messages({
			'string.email': '邮箱格式不正确',
			'string.required': '邮箱不能为空'
		}),
		password: Joi.string().min(6).max(24).required().messages({
			'string.min': '密码最少6个字符',
			'string.max': '密码最多24个字符',
			'string.required': '密码不能为空'
		})
	}

	return await handleValidator(param, rules)
}

exports.loginValidator = async param => {
	const rules = {
		email: Joi.string().email().required().messages({
			'string.email': '邮箱格式不正确',
			'string.required': '邮箱不能为空'
		}),
		password: Joi.string().min(6).max(24).required().messages({
			'string.min': '密码最少6个字符',
			'string.max': '密码最多24个字符',
			'string.required': '密码不能为空'
		})
	}

	return await handleValidator(param, rules)
}

exports.updateCurrentUserValidator = async param => {
	const rules = {
		username: Joi.string().min(3).max(24).messages({
			'string.min': '用户名长度不能小于3',
			'string.max': '用户名长度不能大于24'
		}),
		email: Joi.string().email().messages({
			'string.email': '邮箱格式不正确'
		}),
		password: Joi.string().min(6).max(24).messages({
			'string.min': '密码长度不能小于6',
			'string.max': '密码长度不能大于24'
		}),
		bio: Joi.string().max(160).messages({
			'string.max': '简介不能超过160个字符'
		}),
		image: Joi.string().messages({
			string: '图片路径格式不正确'
		})
	}
}
