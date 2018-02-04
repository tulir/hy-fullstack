import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Filter from "./filter"
import { voteAnecdote, notify } from "../actions"

class AnecdoteList extends React.Component {
	render() {
		return (
			<main>
				<h2>Anecdotes</h2>
				<Filter/>
				<ul className="list-group">
					{this.props.anecdotes.map(anecdote =>
						<li className="list-group-item" key={anecdote.id}>
							<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
						</li>
					)}
				</ul>
			</main>
		)
	}
}

export default connect(
	state => ({ anecdotes: state.anecdotes
		.sort((a, b) => b.votes - a.votes)
		.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)) }),
	{ voteAnecdote, notify }
)(AnecdoteList)
