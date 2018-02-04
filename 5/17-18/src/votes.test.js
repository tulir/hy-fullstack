import deepFreeze from "deep-freeze"
import counterReducer from "./votes"

describe("unicafe reducer", () => {
	const initialState = {
		good: 0,
		neutral: 0,
		bad: 0
	}

	it("should return a proper initial state when called with undefined state", () => {
		const action = {
			type: "DO_NOTHING"
		}

		const newState = counterReducer(undefined, action)
		expect(newState).toEqual(initialState)
	})

	it("increments good", () => {
		const action = {
			type: "good"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 1,
			neutral: 0,
			bad: 0
		})
	})

	it("increments bad", () => {
		const action = {
			type: "bad"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(counterReducer(state, action), action)
		expect(newState).toEqual({
			good: 0,
			neutral: 0,
			bad: 2
		})
	})

	it("increments neutral", () => {
		const action = {
			type: "neutral"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			neutral: 1,
			bad: 0
		})
	})
})
