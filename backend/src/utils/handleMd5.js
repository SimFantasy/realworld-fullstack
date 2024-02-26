const crypto = require('crypto')

module.exports = str => {
	return crypto
		.createHash('sha256')
		.update(str + process.env.MD5_SALT)
		.digest('hex')
}
