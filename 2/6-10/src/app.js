import React from "react"

const Input = ({value, text, name, onChange}) => <div>
	{text}: <input value={value} name={name} onChange={onChange}/>
</div>

const NewEntryForm = ({newEntry, onSubmit, onChange}) => <form onSubmit={onSubmit}>
	<h3>Lisää uusi</h3>
	<Input value={newEntry.name} text="nimi" name="name" onChange={onChange}/>
	<Input value={newEntry.number} text="numero" name="number" onChange={onChange}/>
	<div>
		<button type="submit">lisää</button>
	</div>
</form>

const Phonebook = ({people, filter}) => <table>
	<tbody>
		{people
			.filter(person => person.name.toLowerCase().includes(filter))
			.map(person => <tr key={person.name}>
				<th>{person.name}</th>
				<th>{person.number}</th>
			</tr>)}
	</tbody>
</table>


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			people: [
				{ name: 'Arto Hellas', number: '040-123456' },
				{ name: 'Martti Tienari', number: '040-123456' },
				{ name: 'Arto Järvinen', number: '040-123456' },
				{ name: 'Lea Kutvonen', number: '040-123456' }
			],
			new: {
				name: "",
				number: "",
			},
			filter: "",
		}
	}

	newEntryInputChanged = (evt) => {
		this.setState({
			new: Object.assign({}, this.state.new, {[evt.target.name]: evt.target.value})
		})
	}

	filterChanged = (evt) => {
		this.setState({
			filter: evt.target.value.toLowerCase()
		})
	}

	addPerson = (evt) => {
		evt.preventDefault()
		const people = this.state.people.concat([this.state.new])
		this.setState({
			people,
			new: {
				name: "",
				number: "",
			},
		})
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				rajaa näytettäviä: <input value={this.state.filter} onChange={this.filterChanged}/>
				<NewEntryForm newEntry={this.state.new} onSubmit={this.addPerson} onChange={this.newEntryInputChanged}/>

				<h3>Numerot</h3>
				<Phonebook people={this.state.people} filter={this.state.filter}/>
			</div>
		)
	}
}

export default App
