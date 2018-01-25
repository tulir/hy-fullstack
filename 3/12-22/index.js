const express = require("express")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const Phonebook = require("./mongo")

morgan.token("body", request => JSON.stringify(request.body))

const app = express()
app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(morgan(":method :url :body :status :res[content-length] - :response-time ms"))

app.get("/api/persons", async (request, response) => response.json(await Phonebook.all()))

app.post("/api/persons", async (request, response) => {
	try {
		const inputPerson = request.body
		const person = await Phonebook.insert(inputPerson.name, inputPerson.number)
		response.status(201).json(person).end()
	} catch (e) {
		if (e instanceof Phonebook.Error) {
			e.write(response)
		} else {
			console.error(e)
		}
	}
})

app.get("/api/persons/:id", async (request, response) => {
	try {
		response.json(await Phonebook.get(request.params.id, true))
	} catch (e) {
		if (e instanceof Phonebook.Error) {
			e.write(response)
		} else {
			console.error(e)
		}
	}
})

app.put("/api/persons/:id", async (request, response) => {
	try {
		const person = request.body
		response.json(await Phonebook.update(person.id, person.name, person.number))
	} catch (e) {
		if (e instanceof Phonebook.Error) {
			e.write(response)
		} else {
			console.error(e)
		}
	}
})

app.delete("/api/persons/:id", async (request, response) => {
	try {
		await Phonebook.remove(request.params.id)
		response.status(204).end()
	} catch (e) {
		if (e instanceof Phonebook.Error) {
			e.write(response)
		} else {
			console.error(e)
		}
	}
})

app.get("/info", async (request, response) => {
	response.send(`puhelinluettelossa on ${(await Phonebook.all()).length} henkilön tiedot\n\n${Date()}\n`)
})

app.listen(process.env.PORT || 29391)
