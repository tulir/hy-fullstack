import React from "react"
import { filter } from "../actions"
import { connect } from "react-redux"

class Filter extends React.Component {
	filter = evt => {
		this.props.filter(evt.target.value)
	}

	render() {
		return <div style={{margin: "1rem 0"}}>
			<input type="text" className="form-control" onChange={this.filter} placeholder="Filter"/>
		</div>
	}
}

export default connect(null, {filter})(Filter)
