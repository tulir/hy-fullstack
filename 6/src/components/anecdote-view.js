import React from "react"
import { connect } from "react-redux"
import { voteAnecdote, notify } from "../actions"

class AnecdoteView extends React.Component {
	vote = () => {
		this.props.voteAnecdote(this.props)
		this.props.notify(`Voted for "${this.props.content}"`)
	}

	render() {
		return (
			<main>
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">{this.props.content}</h4>
						<h6 className="card-subtitle">
							has {this.props.votes} votes
						</h6>
						<button className="btn btn-block btn-primary" onClick={this.vote}>
							vote
						</button>
					</div>
				</div>
			</main>
		)
	}
}

export default connect(
	state => ({ anecdotes: state.anecdotes
		.sort((a, b) => b.votes - a.votes)
		.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)) }),
	{ voteAnecdote, notify }
)(AnecdoteView)
