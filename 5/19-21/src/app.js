import React from "react"

class App extends React.Component {
	create(evt) {
		evt.preventDefault()
		this.props.store.dispatch({
			type: "create",
			anecdote: this.createInput.value,
		})
	}

	render() {
		const anecdotes = this.props.store.getState()
		console.log(anecdotes)
		return (
			<div>
				<h2>Anecdotes</h2>
				{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => this.props.store.dispatch({type: "vote", id: anecdote.id})}>
								vote
							</button>
						</div>
					</div>
				)}
				<h2>create new</h2>
				<form onSubmit={evt => this.create(evt)}>
					<div><input ref={ref => this.createInput = ref}/></div>
					<button type="submit">create</button>
				</form>
			</div>
		)
	}
}

export default App
