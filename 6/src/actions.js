import anecdoteService from "./services/anecdotes"
export const CREATE_ANECDOTE = "CREATE"
export const INIT_ANECDOTES = "INIT ANECDOTES"
export const VOTE_ANECDOTE = "VOTE"
export const NOTIFY = "NOTIFY"
export const CLEAR_NOTIFICATION = "CLEAR NOTIFICATION"
export const FILTER = "FILTER"

export function initAnecdotes() {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: INIT_ANECDOTES,
			content: anecdotes,
		})
	}
}

export function createAnecdote(message) {
	return async dispatch => {
		const content = await anecdoteService.create(message)
		dispatch({
			type: CREATE_ANECDOTE,
			content,
		})
	}
}

export function voteAnecdote(anecdote) {
	return async dispatch => {
		await anecdoteService.vote(anecdote)
		dispatch({
			type: VOTE_ANECDOTE,
			id: anecdote.id,
		})
	}
}

export function filter(by) {
	return {
		type: FILTER,
		content: by,
	}
}

export function notify(message, timeout=5) {
	return dispatch => {
		dispatch({
			type: NOTIFY,
			message,
			timeout: timeout ? setTimeout(() => dispatch(hideNotification()), timeout * 1000) : undefined,
		})
	}
}

export function hideNotification() {
	return {
		type: CLEAR_NOTIFICATION,
	}
}
