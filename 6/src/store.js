import { createStore, compose, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import anecdotes from "./reducers/anecdotes"
import notification from "./reducers/notifications"
import filter from "./reducers/filter"

const reducers = combineReducers({
	anecdotes,
	notification,
	filter,
})

const store = compose(applyMiddleware(thunk))(createStore)(reducers)
//const store = createStore(reducers, applyMiddleware(thunk)))

export default store
