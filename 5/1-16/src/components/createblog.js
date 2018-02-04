import React from "react"
import blogs from "../services/blogs"
import PropTypes from "prop-types"

class CreateBlogView extends React.Component {
	static propTypes = {
		finish: PropTypes.func.isRequired,
		cancel: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			title: "",
			author: "",
			url: "",
			error: undefined,
		}

		this.errorStyle = {
			color: "red",
			background: "orange",
			fontSize: "20px",
			borderStyle: "solid",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		}
		this.inputChanged = this.inputChanged.bind(this)
		this.submit = this.submit.bind(this)
	}

	inputChanged(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	async submit(event) {
		event.preventDefault()
		try {
			const blog = await blogs.create(this.state)
			this.props.finish(blog)
		} catch (err) {
			let error
			if (err.response && typeof err.response.data === "object" && err.response.data.message) {
				error = err.response.data.message
			} else {
				error = err.message
			}
			this.setState({error},
				() => setTimeout(
					() => this.setState({error: undefined}),
					5000))
		}
	}

	render() {
		return (
			<div className="create-blog">
				<h1>Create blog</h1>
				<form onSubmit={this.submit}>
					{this.state.error ? <div className="error" style={this.errorStyle}>{this.state.error}</div> : undefined}
					<input name="title" placeholder="Title" type="text" onChange={this.inputChanged} value={this.state.title}/>
					<br/>
					<input name="author" placeholder="Author" type="text" onChange={this.inputChanged} value={this.state.author}/>
					<br/>
					<input name="url" placeholder="URL" type="text" onChange={this.inputChanged} value={this.state.url}/>
					<br/>
					<button type="submit">Create</button>
					<button type="button" onClick={this.props.cancel}>Cancel</button>
				</form>
			</div>
		)
	}
}

export default CreateBlogView
