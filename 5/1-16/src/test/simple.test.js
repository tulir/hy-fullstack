import React from "react"
import { shallow } from "enzyme"
import SimpleBlog from "../components/simple"

describe("<SimpleBlog/>", () => {
	it("renders content", () => {
		const blog = {
			"title": "Kääk",
			"author": "Aku Ankka",
			"url": "https://example.com",
			"likes": 9001,
		}

		const component = shallow(<SimpleBlog blog={blog}/>)
		expect(component.find(".main").text()).toContain(blog.title)
		expect(component.find(".main").text()).toContain(blog.author)
		expect(component.find(".likes").text()).toContain(blog.likes)
	})

	it("can be clicked", () => {
		const blog = {
			"title": "Kääk",
			"author": "Aku Ankka",
			"url": "https://example.com",
			"likes": 9001,
		}
		let clicks = 0

		const component = shallow(<SimpleBlog blog={blog} onClick={() => clicks++}/>)
		const btn = component.find(".likes > button")
		btn.simulate("click")
		btn.simulate("click")
		expect(clicks).toBe(2)
	})
})
