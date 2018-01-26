const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	username: String,
	name: String,
	password: String,
	adult: Boolean,
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
})

userSchema.statics.format = user => ({
	username: user.username,
	name: user.name,
	adult: user.adult,
	blogs: user.blogs,
	_id: user._id.toString(),
})

module.exports = mongoose.model("User", userSchema)
