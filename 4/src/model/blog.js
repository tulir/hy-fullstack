const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

blogSchema.statics.format = blog => ({
	title: blog.title,
	author: blog.author,
	url: blog.url,
	likes: blog.likes,
	_id: blog._id.toString(),
})

module.exports = mongoose.model("Blog", blogSchema)
