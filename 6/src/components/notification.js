import React from "react"
import { connect } from "react-redux"

class Notification extends React.Component {
	render() {
		if (!this.props.message) {
			return null
		}
		return (
			<div className="alert alert-success">
				{this.props.message}
			</div>
		)
	}
}

export default connect(state => ({message: state.notification.message}))(Notification)
