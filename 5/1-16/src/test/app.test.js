import React from "react"
import { mount } from "enzyme"
import Blog from "../components/blog"
import blogs from "../services/blogs"
import LoginView from "../components/login"
import App from "../app"

jest.mock("../services/auth")
jest.mock("../services/blogs")

describe("<App/>", () => {
	let app

	describe("before login", () => {
		beforeEach(() => {
			app = mount(<App/>)
		})

		it("doesn't show content", () => {
			app.update()
			expect(app.find(LoginView)).toHaveLength(1)
			expect(app.find(Blog)).toHaveLength(0)
		})
	})

	describe("after login", () => {
		beforeEach(() => {
			window.localStorage.username = "joku"
			window.localStorage.name = "Jok U."
			window.localStorage.authtoken = "MockToken"
			app = mount(<App/>)
		})

		it("is logged in", () => {
			app.update()
			expect(app.find(LoginView)).toHaveLength(0)
		})

		it("contains (correct number of) blogs", async () => {
			app.update()
			expect(app.find(Blog)).toHaveLength((await blogs.getAll()).length)
		})
	})
})
