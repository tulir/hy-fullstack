import React from "react"

const Title = ({title}) => <h1>{title}</h1>

const Exercises = ({parts}) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

const ExerciseCount = ({sum}) => <p>yhteensä {sum} tehtävää</p>

const Course = ({course}) => <div>
	<Title title={course.name}/>
	<Exercises parts={course.parts}/>
	<ExerciseCount sum={course.parts.reduce((value, part) => value + part.exercises, 0)}/>
</div>

export default Course
