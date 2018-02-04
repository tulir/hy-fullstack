import axios from "axios"

const baseURL = "api/blogs"

const getAll = async () => {
	const response = await axios.get(baseURL)
	return response.data
}

const create = async blog => {
	const response = await axios.post(baseURL, blog)
	return response.data
}

const like = async id => {
	const response = await axios.post(`${baseURL}/${id}/like`)
	return response.data
}

const remove = async id => {
	await axios.delete(`${baseURL}/${id}`)
}

export default { getAll, create, like, remove }
