const login = async (username) => {
	window.localStorage.name = "Jok U."
	window.localStorage.username = username
	window.localStorage.authtoken = "MockToken"
}

export default { login }
