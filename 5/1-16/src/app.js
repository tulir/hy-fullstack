import React from "react"
import Blog from "./components/blog"
import LoginView from "./components/login"
import blogs from "./services/blogs"
import CreateBlogView from "./components/createblog"
import axios from "axios/index"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			blogs: [],
			creating: false,
			authenticated: !!window.localStorage.authtoken,
			notification: undefined,
		}
		if (this.state.authenticated) {
			axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.authtoken}`
		}
		this.onCreateBlog = this.onCreateBlog.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.notificationStyle = {
			color: "green",
			background: "lime",
			fontSize: "20px",
			borderStyle: "solid",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		}
	}

	sortBlogs(blogs) {
		return blogs.sort((a, b) => b.likes - a.likes)
	}

	onCreateBlog(blog) {
		this.setState({
			creating: false,
			blogs: this.sortBlogs(this.state.blogs.concat([blog])),
			notification: `Added blog "${blog.title}" by ${blog.author}`
		}, () => setTimeout(() => this.setState({notification: undefined}), 5000))
	}

	onUpdateBlog(index, blog) {
		const blogs = this.state.blogs.slice()
		blogs[index] = blog
		this.sortBlogs(blogs)
		this.setState({blogs})
	}

	onDeleteBlog(index) {
		const blogs = this.state.blogs.slice()
		blogs.splice(index, 1)
		this.setState({blogs})
	}

	login() {
		this.setState({ authenticated: true })
		axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.authtoken}`
	}

	logout() {
		this.setState({ authenticated: false })
		window.localStorage.clear()
		delete axios.defaults.headers.common.Authorization
	}

	async componentDidMount() {
		this.setState({
			blogs: this.sortBlogs(await blogs.getAll()),
		})
	}

	render() {
		if (!this.state.authenticated) {
			return <LoginView onLogin={this.login}/>
		} else if (this.state.creating) {
			return <CreateBlogView cancel={() => this.setState({creating: false})} finish={this.onCreateBlog}/>
		}
		return (
			<div>
				<h1>Blogs</h1>
				{this.state.notification ? <div className="notification" style={this.notificationStyle}>{this.state.notification}</div> : undefined}

				<div>
					Logged in as {window.localStorage.name}
					<button onClick={this.logout}>Log out</button>
				</div>

				<button onClick={() => this.setState({creating: true})}>Create blog</button>

				{this.state.blogs.map((blog, index) =>
					<Blog delete={() => this.onDeleteBlog(index)} update={newBlog => this.onUpdateBlog(index, newBlog)} key={blog._id} blog={blog}/>
				)}
			</div>
		)
	}
}

export default App
