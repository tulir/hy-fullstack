import axios from "axios"

const baseURL = "api/login"

const login = async (username, password) => {
	const response = await axios.post(baseURL, {
		username, password,
	})
	window.localStorage.name = response.data.name
	window.localStorage.username = response.data.username
	window.localStorage.authtoken = response.data.token
}

export default { login }
