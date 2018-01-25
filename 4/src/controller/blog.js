const router = require("express").Router()
const Blog = require("../model/blog")

router.get("/", async (request, response) => response.json(await Blog.find({})))

router.post("/", async (request, response) => {
	const blog = new Blog(request.body)
	if (!blog.title || !blog.url) {
		return response.status(400).end()
	}
	if (!blog.likes) {
		blog.likes = 0
	}
	const result = await blog.save()
	response.status(201).json(result)
})

router.delete("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		response.status(404).end()
	}
	await blog.remove()
	response.status(204).end()
})

router.put("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		response.status(404).end()
	}
	const inputData = request.body
	blog.title = inputData.title || blog.title
	blog.author = inputData.author || blog.author
	blog.url = inputData.url || blog.url
	blog.likes = inputData.likes || blog.likes
	await blog.save()
	response.json(Blog.format(blog))
})

module.exports = router
