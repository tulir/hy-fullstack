const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

blogSchema.statics.format = blog => ({
	title: blog.title,
	author: blog.author,
	url: blog.url,
	likes: blog.likes,
	user: blog.user,
	_id: blog._id.toString(),
})

module.exports = mongoose.model("Blog", blogSchema)
