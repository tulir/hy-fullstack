import React from "react"
import { Route, withRouter } from "react-router-dom"
import Notification from "./components/notification"
import AnecdoteForm from "./components/anecdote-form"
import AnecdoteList from "./components/anecdote-list"
import AnecdoteView from "./components/anecdote-view"
import AboutPage from "./components/about"
import Header from "./components/header"
import Footer from "./components/footer"
import { connect } from "react-redux"
import { initAnecdotes } from "./actions"

class App extends React.Component {
	constructor(props, context) {
		super(props, context)
		props.initAnecdotes()
	}

	renderAnecdote(id) {
		const anecdote = this.props.anecdotes.find(anecdote => anecdote.id === id)
		return <AnecdoteView {...anecdote}/>
	}

	render() {
		return (
			<div className="container">
				<Header/>
				<Notification/>
				<Route exact path="/" render={() => <AnecdoteList/>}/>
				<Route exact path="/anecdotes/:id" render={({match}) => this.renderAnecdote(match.params.id)}/>
				<Route exact path="/create" render={() => <AnecdoteForm/>}/>
				<Route exact path="/about" render={() => <AboutPage/>}/>
				<Footer/>
			</div>
		)
	}
}

export default withRouter(connect(state => ({ anecdotes: state.anecdotes }), { initAnecdotes })(App))
