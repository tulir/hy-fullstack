require("dotenv").config()

let port = process.env.PORT
let mongoURL = process.env.MONGODB_URI

if (process.env.NODE_ENV === "test") {
	port = process.env.TEST_PORT || port
	mongoURL = process.env.TEST_MONGODB_URI || mongoURL
}

module.exports = {
	mongoURL,
	port: port || 29392,
}
