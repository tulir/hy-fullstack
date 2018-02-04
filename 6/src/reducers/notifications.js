const initialState = {
	message: "",
	timeout: undefined,
}

const reducer = (store = initialState, action) => {
	if (action.type === "NOTIFY") {
		if (store.timeout) {
			clearTimeout(store.timeout)
		}
		store = {
			message: action.message,
			timeout: action.timeout,
		}
	} else if (action.type === "CLEAR NOTIFICATION") {
		store = {
			message: "",
			timeout: undefined,
		}
	}
	return store
}

export default reducer
