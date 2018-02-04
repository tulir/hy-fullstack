const anecdotesAtStart = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

const getID = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getID(),
		votes: 0
	}
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
	state = state.slice()
	if (action.type === "vote") {
		const index = state.findIndex(obj => obj.id === action.id)
		const anecdote = Object.assign({}, state[index])
		anecdote.votes++
		state[index] = anecdote
	} else if (action.type === "create") {
		state.push({
			content: action.anecdote,
			id: getID(),
			votes: 0
		})
	}
	return state
}

export default reducer
