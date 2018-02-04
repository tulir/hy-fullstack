import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./app"
import store from "./store"

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>,
		document.getElementById("root"))
}
render()
store.subscribe(render)
