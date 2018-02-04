import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import voteReducer from "./votes"

const store = createStore(voteReducer)

const Button = ({ text, event }) => <button onClick={() => store.dispatch({type: event})}>{text}</button>

const Statistic = ({ name, value }) => <tr>
	<th>{name}</th>
	<th>{value}</th>
</tr>

const Statistics = ({ statistics }) => {
	const stats = Object.entries(statistics)
		.map(([key, value]) =>
			<Statistic key={key} name={key} value={value}/>)
	return stats.length > 0 ? (
		<table>
			<tbody>{stats}</tbody>
		</table>
	) : "yhtään palautetta ei ole annettu"
}

function getStatistics() {
	const state = store.getState()
	const totalVotes = (state.good + state.neutral + state.bad)
	if (isNaN(totalVotes) || totalVotes === 0) {
		return {}
	}
	return {
		hyvä: state.good,
		neutraali: state.neutral,
		huono: state.bad,
		keskiarvo: Math.round((state.good - state.bad) / totalVotes * 10) / 10,
		positiivisia: Math.round(state.good / totalVotes * 1000) / 10 + " %",
	}
}

const App = () => {
	return (
		<div>
			<h1>Anna palautetta</h1>
			<Button text="hyvä" event="good"/>
			<Button text="neutraali" event="neutral"/>
			<Button text="huono" event="bad"/>

			<h1>Statistiikkaa</h1>
			<Statistics statistics={getStatistics()}/>
		</div>
	)
}

const render = () => { ReactDOM.render(<App />, document.getElementById("root")) }
render()
store.subscribe(render)
