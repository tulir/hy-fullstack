import axios from "axios"

const getAll = () => axios.get("http://localhost:3001/people").then(response => response.data)

const add = (person) => axios.post("http://localhost:3001/people", person).then(response => response.data)

const update = (person) => axios.put(`http://localhost:3001/people/${person.id}`, person).then(response => response.data)

const remove = (id) => axios.delete(`http://localhost:3001/people/${id}`)

export default { getAll, add, update, remove }
