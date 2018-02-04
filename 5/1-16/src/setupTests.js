import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

const baseStore = {
	clear() {
		window.localStorage = Object.assign({}, baseStore)
	}
}

baseStore.clear()
