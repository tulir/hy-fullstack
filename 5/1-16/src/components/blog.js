import React from "react"
import PropTypes from "prop-types"
import blogs from "../services/blogs"

class Blog extends React.Component {
	static propTypes = {
		update: PropTypes.func.isRequired,
		delete: PropTypes.func.isRequired,
		blog: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = Object.assign({full: false}, props.blog)
		delete this.state.update
		delete this.state.delete
		this.like = this.like.bind(this)
		this.delete = this.delete.bind(this)

		this.style = {
			border: "1px solid black",
			padding: "6px",
			cursor: "pointer",
			margin: "4px 0",
		}
		this.fullStyle = Object.assign({}, this.style, {
			cursor: "initial",
			main: {
				cursor: "pointer",
			},
			extra: {
				margin: "8px 12px 4px",
			},
		})
	}

	async like() {
		const blog = await blogs.like(this.state._id)
		blog.full = this.state.full
		this.setState(blog)
		this.props.update(blog)
	}

	async delete() {
		if (window.confirm(`Delete "${this.state.title}" by ${this.state.author}?`)) {
			await blogs.remove(this.state._id)
			this.props.delete()
		}
	}

	render() {
		if (this.state.full) {
			return (
				<div style={this.fullStyle} className="full blog">
					<div style={this.fullStyle.main} className="main" onClick={() => this.setState({full: false})}>
						{this.state.title} by {this.state.author}
					</div>
					<div style={this.fullStyle.extra} className="extra">
						<a href={this.state.url}>{this.state.url}</a>
						<br/>

						{this.state.likes} likes - <button onClick={this.like}>like</button>
						<br/>

						Added by {this.state.user.name}
						<br/>

						{this.state.user.username === window.localStorage.username
							? <button className="delete" onClick={this.delete}>Delete</button>
							: undefined}
					</div>
				</div>
			)
		}
		return (
			<div style={this.style} className="blog" onClick={() => this.setState({full: true})}>
				{this.state.title} by {this.state.author}
			</div>
		)
	}
}

export default Blog
