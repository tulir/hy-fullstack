const router = require("express").Router()
const Blog = require("../model/blog")

router.get("/", async (request, response) => response.json(await Blog.find({})))

router.post("/", async (request, response) => {
	const blog = new Blog(request.body)

	const result = await blog.save()
	response.status(201).json(result)
})

module.exports = router
