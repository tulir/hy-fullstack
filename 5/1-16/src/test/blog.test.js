import React from "react"
import { shallow } from "enzyme"
import Blog from "../components/blog"

describe("<Blog/>", () => {
	it("renders basic content", () => {
		const blog = {
			"title": "Kääk",
			"author": "Aku Ankka",
			"url": "https://example.com",
			"likes": 9001,
		}
		const func = () => {}

		const component = shallow(<Blog blog={blog} update={func} delete={func}/>)
		const divText = component.find(".blog").text()
		expect(divText).toContain(blog.title)
		expect(divText).toContain(blog.author)
		expect(divText).not.toContain(blog.likes)
		expect(divText).not.toContain(blog.url)
	})

	it("can be clicked", () => {
		const blog = {
			"title": "Kääk",
			"author": "Aku Ankka",
			"url": "https://example.com",
			"likes": 9001,
			"user": {
				"name": "Jok U.",
				"username": "joku"
			}
		}
		const func = () => {}

		const component = shallow(<Blog blog={blog} update={func} delete={func}/>)
		component.find(".blog").simulate("click")
		const mainInfo = component.find(".blog > .main").text()
		const extraInfo = component.find(".blog > .extra").text()
		expect(mainInfo).toContain(blog.title)
		expect(mainInfo).toContain(blog.author)
		expect(extraInfo).toContain(blog.likes)
		expect(extraInfo).toContain(blog.url)
		expect(extraInfo).toContain(blog.user.name)
	})
})
