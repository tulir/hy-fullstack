import React from "react"
import auth from "../services/auth"
import PropTypes from "prop-types"

class LoginView extends React.Component {
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			error: undefined,
		}
		// FIXME Move to real stylesheets in part 7
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
		this.login = this.login.bind(this)
	}

	inputChanged(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	async login(event) {
		event.preventDefault()
		try {
			await auth.login(this.state.username, this.state.password)
			this.props.onLogin()
		} catch (err) {
			let error
			if (err.response.status === 401) {
				error = "Incorrect username or password"
			} else if (typeof err.response.data === "object" && err.response.data.message) {
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
			<div className="login">
				<h1>Log in</h1>
				<form onSubmit={this.login}>
					{this.state.error ? <div className="error" style={this.errorStyle}>{this.state.error}</div> : undefined}
					<input name="username" placeholder="Username" type="text" onChange={this.inputChanged} value={this.state.username}/>
					<br/>
					<input name="password" placeholder="Password" type="password" onChange={this.inputChanged} value={this.state.password}/>
					<br/>
					<button type="submit">Log in</button>
				</form>
			</div>
		)
	}
}

export default LoginView
