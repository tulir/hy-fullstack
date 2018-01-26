const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const User = require("../model/user")

router.post("/", async (request, response) => {
	const user = await User.findOne({username: request.body.username})
	if (!user || !bcrypt.compare(request.body.password, user.password)) {
		return response.status(401).json({"error": "incorrect username or password"}).end()
	}
	const tokenUser = {
		username: user.username,
		id: user._id,
	}
	const token = jwt.sign(tokenUser, process.env.SECRET)
	response.status(200).json({token, username: user.username, name: user.name})
})

module.exports = router
