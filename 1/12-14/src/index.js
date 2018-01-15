import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			votes: props.anecdotes.map(() => 0),
		}
	}

	vote() {
		const votes = [...this.state.votes]
		votes[this.state.selected] += 1
		this.setState({votes})
	}

	next() {
		let next = this.state.selected + 1
		if (next >= this.props.anecdotes.length) {
			next = 0
		}
		this.setState({selected: next})
	}

	getAnecdote(index) {
		return <p>
			<b>{this.props.anecdotes[index]}</b>
			<br/>
			has {this.state.votes[index]} votes
		</p>
	}

	get best() {
		return this.getAnecdote(this.state.votes.indexOf(Math.max(...this.state.votes)))
	}

	get current() {
		return this.getAnecdote(this.state.selected)
	}

	render() {
		return (
			<div>
				{this.current}
				<button onClick={this.vote.bind(this)}>vote</button>
				<button onClick={this.next.bind(this)}>next anecdote</button>
				<h1>anecdote with most votes:</h1>
				{this.best}
			</div>
		)
	}
}
const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById("root"))
