const initialState = ""

const reducer = (store = initialState, action) => {
	if (action.type === "FILTER") {
		return action.content.toLowerCase()
	}
	return store
}

export default reducer
