import axios from "axios"

function getAll() {
	return axios.get("/anecdotes").then(resp => resp.data)
}

function vote(anecdote) {
	return axios.patch(`/anecdotes/${anecdote.id}`, {votes: anecdote.votes + 1}).then(resp => resp.data)
}

function create(content) {
	return axios.post("/anecdotes", {
		content,
		votes: 0,
	}).then(resp => resp.data)
}

export default { getAll, vote, create }
