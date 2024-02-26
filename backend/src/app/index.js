const path = require('path')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Router = require('@koa/router')
const dotenv = require('dotenv')
const error = require('koa-json-error')
const requireDirectory = require('require-directory')

dotenv.config()

require('@app/db')

const app = new Koa()

app.use(
	error({
		postFormat: (e, { stack, ...rest }) =>
			process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
	})
)

app.use(
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'DELETE', 'PUT']
	})
)

app.use(bodyparser())

requireDirectory(module, path.resolve(__dirname, '../router'), {
	visit: obj => {
		if (obj instanceof Router) {
			app.use(obj.routes()).use(obj.allowedMethods())
		}
	},
	exclude: /(index|router)\.js$/
})

module.exports = app
