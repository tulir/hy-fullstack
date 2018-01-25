import axios from "axios"

const getAll = () => axios.get("api/persons").then(response => response.data)

const add = (person) => axios.post("api/persons", person).then(response => response.data)

const update = (person) => axios.put(`api/persons/${person.id}`, person).then(response => response.data)

const remove = (id) => axios.delete(`api/persons/${id}`)

export default { getAll, add, update, remove }
