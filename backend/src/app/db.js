const mongoose = require('mongoose')

try {
	mongoose.connect(process.env.MONGODB_URI)
	console.log('Connected to MongoDB')
} catch (error) {
	console.log('Connection to MongoDB failed', error)
}

mongoose.connection.on('error', error => {
	console.log('Connected to MongoDB failed', error)
})

module.exports = mongoose
