require("dotenv").config()
const mongoose = require("mongoose")
mongoose.Promise = Promise

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = mongoose.Schema({
	name: String,
	number: String,
})

personSchema.statics.format = person => ({
	name: person.name,
	number: person.number,
	id: person._id,
})

const Person = mongoose.model("Person", personSchema)

class PhonebookError extends Error {
	constructor(message, status) {
		super(message)
		this.message = message
		this.status = status
	}

	write(response) {
		response
			.status(this.status)
			.json({ error: this.message })
			.end()
	}
}

const Phonebook = {
	Person,
	Error: PhonebookError,
	async insert(name, number) {
		if (!name || !number) {
			throw new PhonebookError("name or number missing", 400)
		} else if (await this._exists(name)) {
			throw new PhonebookError("name must be unique", 409)
		}
		const person = new Person({ name, number })
		await person.save()
		return Person.format(person)
	},
	async get(id, format = false) {
		const person = await Person.findById(id)
		if (!person) {
			throw new PhonebookError("name must be unique", 409)
		}
		return format ? Person.format(person) : person
	},
	async _exists(name, excludeID) {
		const people = await Person.find({ name })
		if (people.length === 0) {
			return false
		} else if (people.length > 1) {
			throw new PhonebookError("database corrupted", 500)
		}
		const person = people[0]
		if (!person || person._id.equals(excludeID)) {
			return false
		}
		return true
	},
	async update(id, name, number) {
		const person = await Person.findById(id)
		if (!person) {
			throw new PhonebookError("person not found", 404)
		} else if (await this._exists(name, person._id)) {
			throw new PhonebookError("name must be unique", 409)
		}
		person.name = name || person.name
		person.number = number || person.number
		await person.save()
		return Person.format(person)
	},
	async remove(id) {
		const person = await Person.findById(id)
		if (!person) {
			throw new PhonebookError("person not found", 404)
		}
		await person.remove()
	},
	async all() {
		return (await Person.find({})).map(Person.format)
	},
}

module.exports = Phonebook

if (process.argv.length > 1 && process.argv[1].endsWith("mongo.js")) {
	async function run() {
		try {
			if (process.argv.length > 3) {
				const [, , name, number] = process.argv
				console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
				await Phonebook.insert(name, number)
			} else {
				const people = await Phonebook.all()
				console.log("puhelinluettelo:")
				people.map(person => console.log(person.name, person.number))
			}
		} catch (e) {
			if (e instanceof PhonebookError) {
				console.error(`HTTP ${e.status}: ${e.message}`)
			} else {
				console.error(e)
			}
		}

		mongoose.connection.close()
		process.exit(0)
	}

	run()
}

