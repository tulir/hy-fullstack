const supertest = require("supertest")
const { app, server } = require("../src/index")
const api = supertest(app)
const Blog = require("../src/model/blog")
const User = require("../src/model/user")

describe("users work correctly", () => {
	beforeAll(() => User.remove({}))

	test("users are returned correctly", () => api
		.get("/api/users")
		.expect(200)
		.expect("Content-Type", /application\/json/))

	describe("creating a user", () => {
		test("users can be created", () => api
			.post("/api/users")
			.send({
				"username": "mluukkai",
				"name": "Matti Luukkainen",
				"password": "p455w0rd",
				"adult": true,
			})
			.expect(201)
			.expect("Content-Type", /application\/json/))

		test("duplicate users can't be created", async () => {
			await api
				.post("/api/users")
				.send({
					"username": "duplicate",
					"name": "D. Uplicate",
					"password": "PassWoRD",
					"adult": false,
				})
				.expect(201)
				.expect("Content-Type", /application\/json/)
			await api
				.post("/api/users")
				.send({
					"username": "duplicate",
					"name": "D. Uplicate",
					"password": "PassWoRD",
					"adult": false,
				})
				.expect(409)
				.expect("Content-Type", /application\/json/)
		})

		test("users are adult by default", async () => {
			const response = await api
				.post("/api/users")
				.send({
					"username": "nyymi",
					"name": "nyymi",
					"password": "y1114u74",
				})
				.expect(201)
				.expect("Content-Type", /application\/json/)
			expect(response.body.adult).toBe(true)
		})

		test("password needs 3 characters", () => api
			.post("/api/users")
			.send({
				"username": "nyymi2",
				"name": "nyy mi 2",
				"password": "1",
			})
			.expect(400))

		test("invalid user is invalid", () => api
			.post("/api/users")
			.send({
				"name": "minä",
			})
			.expect(400))
	})
})

describe("blogs work correctly", () => {
	const blogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		},
		{
			_id: "5a422b891b54a676234d17fa",
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 10,
			__v: 0
		},
		{
			_id: "5a422ba71b54a676234d17fb",
			title: "TDD harms architecture",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
			likes: 0,
			__v: 0
		},
		{
			_id: "5a422bc61b54a676234d17fc",
			title: "Type wars",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 2,
			__v: 0
		}
	]

	let authtoken = ""

	beforeAll(async () => {
		await Blog.remove({})
		await api.post("/api/users")
			.send({
				"username": "testuser",
				"name": "Test User",
				"password": "p455w0rd",
			})
		const response = await api.post("/api/login")
			.send({
				"username": "testuser",
				"password": "p455w0rd",
			})
		authtoken = `bearer ${response.body.token}`
	})

	async function getBlogs() {
		return (await Blog.find({})).map(Blog.format).map(blog => {
			// We don't care about users here
			delete blog.user
			return blog
		})
	}

	test("blogs are returned correctly", () => api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/))

	describe("creating a blog", () => {
		test("blogs can be created", () => api
			.post("/api/blogs")
			.set("Authorization", authtoken)
			.send({
				"title": "Kääk",
				"author": "Aku Ankka",
				"url": "https://example.com",
				"likes": 9001,
			})
			.expect(201)
			.expect("Content-Type", /application\/json/))

		test("creating blogs is persistent", async () => {
			const newBlog = {
				"_id": "5a422b3a1b54a676234d1666",
				"title": "Blogi",
				"author": "Minä",
				"url": "https://example.com/",
				"likes": 1,
			}

			const blogsBefore = await getBlogs()

			await api
				.post("/api/blogs")
				.set("Authorization", authtoken)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/)

			const blogsAfter = await getBlogs()

			expect(blogsAfter).toHaveLength(blogsBefore.length+1)
			expect(blogsAfter).toContainEqual(newBlog)
		})

		test("blog without likes has 0 likes", async () => {
			const response = await api
				.post("/api/blogs")
				.set("Authorization", authtoken)
				.send({
					"title": "Hmm?",
					"author": "Anon Ymous",
					"url": "https://4chan.org",
				})
				.expect(201)
				.expect("Content-Type", /application\/json/)
			expect(response.body.likes).toBe(0)
		})

		test("invalid blog is invalid", () => api
			.post("/api/blogs")
			.set("Authorization", authtoken)
			.send({
				"author": "N00b",
			})
			.expect(400))
	})

	test("blogs can be deleted", async () => {
		const newBlog = {
			"title": "Blögi",
			"author": "Mina",
			"url": "https://example.com/",
			"likes": 56,
		}

		const blogsBefore = await getBlogs()

		const response = await api
			.post("/api/blogs")
			.set("Authorization", authtoken)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
		const createdBlog = response.body

		const blogsInBetween = await getBlogs()
		expect(blogsInBetween).toHaveLength(blogsBefore.length+1)

		await api
			.delete(`/api/blogs/${createdBlog._id}`)
			.set("Authorization", authtoken)
			.expect(204)

		const blogsAfter = await getBlogs()
		expect(blogsAfter).toHaveLength(blogsBefore.length)
	})

	test("blogs can be edited", async () => {
		const newBlog = {
			"title": "Ploki",
			"author": "Timo Soini",
			"url": "http://timosoini.fi/category/ploki/",
			"likes": 5,
		}

		const addResponse = await api
			.post("/api/blogs")
			.set("Authorization", authtoken)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
		const createdBlog = addResponse.body

		newBlog.likes = -9001
		const editResponse = await api
			.put(`/api/blogs/${createdBlog._id}`)
			.set("Authorization", authtoken)
			.send(newBlog)
			.expect(200)
		const editedBlog = editResponse.body
		expect(editedBlog.likes).toBe(newBlog.likes)
	})
})

afterAll(() => server.close())
