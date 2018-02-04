const reducer = (store = [], action) => {
	if (!action) {
		return store
	}
	store = store.slice()
	if (action.type === "VOTE") {
		const index = store.findIndex(obj => obj.id === action.id)
		const anecdote = Object.assign({}, store[index])
		anecdote.votes++
		store[index] = anecdote
	} else if (action.type === "CREATE") {
		store.push(action.content)
	} else if (action.type === "INIT ANECDOTES") {
		return action.content
	}
	return store
}

export default reducer
