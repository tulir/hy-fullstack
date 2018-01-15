import React from "react"
import ReactDOM from "react-dom"

const Title = ({title}) => <h1>{title}</h1>

const Exercises = ({parts}) => parts.map(part => <p key={part.name}>{part.name} {part.exercises}</p>)

const ExerciseCount = ({sum}) => <p>yhteensä {sum} tehtävää</p>

const App = () => {
	const course = {
		title: "Half Stack -sovelluskehitys",
		parts: [{
			name: "Reactin perusteet",
			exercises: 10,
		}, {
			name: "Tiedonvälitys propseilla",
			exercises: 7,
		}, {
			name: "Komponenttien tila",
			exercises: 14,
		}],
	}

	return (
		<div>
			<Title title={course.title}/>
			<Exercises parts={course.parts}/>
			<ExerciseCount sum={course.parts.reduce((value, part) => value + part.exercises, 0)}/>
		</div>
	)
}

ReactDOM.render(<App/>, document.getElementById("root"))
