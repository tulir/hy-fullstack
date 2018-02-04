import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { createAnecdote, notify } from "../actions"

class AnecdoteForm extends React.Component {
	handleSubmit = (evt) => {
		evt.preventDefault()
		this.props.createAnecdote(evt.target.anecdote.value)
		this.props.notify(`Created anecdote "${evt.target.anecdote.value}"`)
		evt.target.anecdote.value = ""
		this.props.history.push("/")
	}

	render() {
		return (
			<main>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="anecdote">Anecdote</label>
						<input type="text" className="form-control" name='anecdote'/>
					</div>
					<button type="submit" className="btn btn-primary">create</button>
				</form>
			</main>
		)
	}
}

export default withRouter(connect(
	null,
	{ createAnecdote, notify },
)(AnecdoteForm))
