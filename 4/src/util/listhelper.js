const totalLikes = blogs => blogs.reduce((value, blog) => value + blog.likes, 0)
const favoriteBlog = blogs => blogs.reduce((a, b) => a.likes > b.likes ? a : b)
const mostBlogs = blogs => Object.values(
	blogs.reduce((collector, val) => {
		if (!collector[val.author]) {
			collector[val.author] = {
				author: val.author,
				blogs: 0,
			}
		}
		collector[val.author].blogs++
		return collector
	}, {})
).reduce((a, b) => a.blogs > b.blogs ? a : b)
const mostLikes = blogs => Object.values(
	blogs.reduce((collector, val) => {
		if (!collector[val.author]) {
			collector[val.author] = {
				author: val.author,
				likes: 0,
			}
		}
		collector[val.author].likes += val.likes
		return collector
	}, {})
).reduce((a, b) => a.likes > b.likes ? a : b)

module.exports = {totalLikes, favoriteBlog, mostBlogs, mostLikes}
