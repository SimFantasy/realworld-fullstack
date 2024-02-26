const Joi = require('joi')

module.exports = async (params, rules) => {
	const validateSchema = Joi.object(rules)

	try {
		await validateSchema.validateAsync(params, { abortEarly: false })
	} catch (error) {
		return (
			error.details.map(e => {
				const errorMsg = {}
				errorMsg[e.context.key] = e.message
				return errorMsg
			}) ?? '参数错误'
		)
	}
}
