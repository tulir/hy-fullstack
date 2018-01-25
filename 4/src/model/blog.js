const mongoose = require("mongoose")

module.exports = mongoose.model("Blog", {
	title: String,
	author: String,
	url: String,
	likes: Number
})
