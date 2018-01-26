const bcrypt = require("bcrypt")
const router = require("express").Router()
const User = require("../model/user")

router.get("/", async (request, response) => response.json((await User.find({}).populate("blogs")).map(User.format)))

router.post("/", async (request, response) => {
	const user = new User(request.body)
	const existingUser = await User.findOne({name: user.name})
	if (existingUser) {
		return response.status(409).json({"error": "username must be unique"}).end()
	}
	if (!user.name || !user.username || !user.password) {
		return response.status(400).json({"error": "name, username or password missing"}).end()
	}
	if (user.password.length < 3) {
		return response.status(400).json({"error": "password too short"}).end()
	}
	user.password = await bcrypt.hash(user.password, 10)
	if (user.adult === undefined) {
		user.adult = true
	}
	const result = await user.save()
	response.status(201).json(result)
})

module.exports = router
