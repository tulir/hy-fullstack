const jwt = require("jsonwebtoken")
const User = require("../model/user")

const getToken = (request) => {
	const auth = request.get("Authorization")
	if (auth && auth.toLowerCase().startsWith("bearer ")) {
		return auth.substring(7)
	}
	return null
}

const getUser = request => {
	const token = getToken(request)
	if (!token) {
		return undefined
	}

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken || !decodedToken.id) {
		return undefined
	}
	return User.findById(decodedToken.id).populate("blogs")
}

const getUserMiddleware = async (request, response, next) => {
	request.user = await getUser(request)
	next()
}

module.exports = getUserMiddleware
