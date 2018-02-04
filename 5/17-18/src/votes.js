const initialState = {
	good: 0,
	neutral: 0,
	bad: 0
}

const voteReducer = (state = initialState, action) => {
	switch (action.type) {
	case "good":
		return Object.assign({}, state, {good: state.good + 1})
	case "neutral":
		return Object.assign({}, state, {neutral: state.neutral + 1})
	case "bad":
		return Object.assign({}, state, {bad: state.bad + 1})
	default:
		return state
	}
}

export default voteReducer
