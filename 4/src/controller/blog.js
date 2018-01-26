const router = require("express").Router()
const Blog = require("../model/blog")
const User = require("../model/user")

router.get("/", async (request, response) => response
	.json((await Blog.find({}).populate("user"))
		.map(Blog.format)
		.map(blog => {
			if (blog.user) {
				blog.user = User.format(blog.user)
				delete blog.user.blogs
			}
			return blog
		})))

router.post("/", async (request, response) => {
	if (!request.user) {
		response.status(401).json({ error: "token missing or invalid" }).end()
		return
	}
	const blog = new Blog(request.body)
	if (!blog.title || !blog.url) {
		return response.status(400).end()
	}
	if (!blog.likes) {
		blog.likes = 0
	}

	blog.user = request.user
	request.user.blogs.push(blog)
	await request.user.save()

	const result = await blog.save()
	delete result._doc.user._doc.blogs
	response.status(201).json(result)
})

router.delete("/:id", async (request, response) => {
	if (!request.user) {
		return response.status(401).json({ error: "token missing or invalid" }).end()
	}
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		return response.status(404).end()
	} else if (request.user._id.toString() !== blog.user.toString()) {
		return response.status(403).json({ error: "you can not delete blogs that are not yours"}).end()
	}
	await User.findOneAndUpdate({_id: request.user._id}, {$pull: {blogs: {_id: blog._id}}})
	await blog.remove()
	response.status(204).end()
})

router.put("/:id", async (request, response) => {
	if (!request.user) {
		return response.status(401).json({ error: "token missing or invalid" }).end()
	}
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		return response.status(404).end()
	} else if (request.user._id.toString() !== blog.user.toString()) {
		return response.status(403).json({ error: "you can not edit blogs that are not yours"}).end()
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
