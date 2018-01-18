import React from "react"
import peopleAPI from "./people"

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

const Phonebook = ({people, filter, deletePerson}) => <table>
	<tbody>
		{people
			.filter(person => person.name.toLowerCase().includes(filter))
			.map(person => <tr key={person.name}>
				<th>{person.name}</th>
				<th>{person.number}</th>
				<th><button onClick={() => deletePerson(person)}>poista</button></th>
			</tr>)}
	</tbody>
</table>

const Notification = ({ message, type = "error" }) => {
	if (!message) {
		return null
	}
	return (
		<div className={type} style={{
			color: "green",
			background: "lime",
			fontSize: "20px",
			borderStyle: "solid",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		}}>
			{message}
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			people: [],
			new: {
				name: "",
				number: "",
			},
			notification: {},
			filter: "",
		}
	}

	async componentWillMount() {
		this.setState({
			people: await peopleAPI.getAll(),
			new: {
				name: "",
				number: "",
			}
		})
	}

	newEntryInputChanged = (evt) => {
		this.setState({
			new: Object.assign({}, this.state.new, {
				[evt.target.name]: evt.target.value
			})
		})
	}

	filterChanged = (evt) => {
		this.setState({
			filter: evt.target.value.toLowerCase()
		})
	}

	notify = (type, message) => {
		if (this.state.notification.timeout) {
			clearTimeout(this.state.notification.timeout)
		}
		this.setState({
			notification: {
				message,
				type,
				timeout: setTimeout(() => {
					this.setState({notification: {}})
				}, 4000)
			}
		})
	}

	addPerson = async (evt) => {
		evt.preventDefault()
		const newPerson = this.state.new
		const existingPeople = this.state.people.filter(person => person.name === newPerson.name)
		let people = this.state.people
		if (existingPeople.length > 0) {
			const existingPerson = existingPeople[0]
			if (!window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
				return
			}
			existingPerson.number = newPerson.number
			try {
				const updatedPerson = await peopleAPI.update(existingPerson)
				const index = people.findIndex(person => person.id === existingPerson.id)
				people = people.slice()
				people[index] = updatedPerson
				this.notify("info", `Päivitettiin ${updatedPerson.name}`)
			} catch (_) {
				people = people.concat([await peopleAPI.add(newPerson)])
				this.notify("info", `Lisättiin ${newPerson.name}`)
			}
		} else {
			people = people.concat([await peopleAPI.add(newPerson)])
			this.notify("info", `Lisättiin ${newPerson.name}`)
		}
		this.setState({
			people,
			new: {
				name: "",
				number: "",
			},
		})
	}

	deletePerson = async ({name, id}) => {
		if(window.confirm(`Poistetaanko ${name}?`)) {
			await peopleAPI.remove(id)
			const people = this.state.people.filter(person => person.id !== id)
			this.setState({people})
			this.notify("info", `Poistettiin ${name}`)
		}
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification {...this.state.notification}/>
				rajaa näytettäviä: <input value={this.state.filter} onChange={this.filterChanged}/>
				<NewEntryForm newEntry={this.state.new} onSubmit={this.addPerson} onChange={this.newEntryInputChanged}/>

				<h3>Numerot</h3>
				<Phonebook people={this.state.people} filter={this.state.filter} deletePerson={this.deletePerson}/>
			</div>
		)
	}
}

export default App
