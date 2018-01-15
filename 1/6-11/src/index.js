import React from "react"
import ReactDOM from "react-dom"

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

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

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			positive: 0,
			neutral: 0,
			negative: 0,
		}
	}

	get statistics() {
		const totalVotes = (this.state.positive + this.state.neutral + this.state.negative)
		if (totalVotes === 0) {
			return {}
		}
		return {
			hyvä: this.state.positive,
			neutraali: this.state.neutral,
			huono: this.state.negative,
			keskiarvo: Math.round((this.state.positive - this.state.negative) / totalVotes * 10) / 10,
			positiivisia: Math.round(this.state.positive / totalVotes * 1000) / 10 + " %",
		}
	}

	increment(field) {
		this.setState({ [field]: this.state[field] + 1 })
	}

	render() {
		return (
			<div>
				<h1>Anna palautetta</h1>
				<Button text="hyvä" onClick={() => this.increment("positive")}/>
				<Button text="neutraali" onClick={() => this.increment("neutral")}/>
				<Button text="huono" onClick={() => this.increment("negative")}/>

				<h1>Statistiikkaa</h1>
				<Statistics statistics={this.statistics}/>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById("root"))
