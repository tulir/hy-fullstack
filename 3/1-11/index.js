const express = require("express")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require('body-parser')
const morgan = require("morgan")

morgan.token("body", request => JSON.stringify(request.body))

const app = express()
app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let db = JSON.parse(fs.readFileSync("db.json", "utf8"))
let nextID = Math.max(...db.people.map(person => person.id))

function saveDB() {
	fs.writeFile("db.json", JSON.stringify(db, "", "  "), "utf8", () => {})
}

app.get("/api/persons", (request, response) => response.json(db.people))

app.post("/api/persons", (request, response) => {
	const person = request.body
	if (!person.name || !person.number) {
		response.status(400).json({error: "name or number missing"}).end()
		return
	} else if (db.people.find(existingPerson => existingPerson.name === person.name)) {
		response.status(409).json({error: "name must be unique"}).end()
		return
	}
	person.id = ++nextID
	db.people.push(person)
	response.status(201).json(person).end()
	saveDB()
})

app.get("/api/persons/:id", (request, response) => {
	const id = +request.params.id
	const person = db.people.find(person => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.put("/api/persons/:id", (request, response) => {
	const id = +request.params.id
	const person = db.people.find(person => person.id === id)
	if (!person) {
		response.status(404).end()
		return
	}
	const newPerson = request.body
	if (!newPerson.number) {
		response.status(400).json({error: "new number missing"}).end()
		return
	} else if (db.people.find(existingPerson => existingPerson.id !== person.id && existingPerson.name === newPerson.name)) {
		response.status(409).json({error: "name must be unique"}).end()
		return
	}
	person.name = newPerson.name
	person.number = newPerson.number
	response.status(200).end()
	saveDB()
})

app.delete("/api/persons/:id", (request, response) => {
	const id = +request.params.id
	const index = db.people.findIndex(person => person.id === id)
	if (index >= 0) {
		db.people.splice(index, 1)
		response.status(204).end()
		saveDB()
	} else {
		response.status(404).end()
	}
})

app.get("/info", (request, response) => {
	response.send(`puhelinluettelossa on ${db.people.length} henkilön tiedot\n\n${Date()}\n`)
})

app.listen(process.env.PORT || 29391)
