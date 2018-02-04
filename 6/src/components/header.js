import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => <header style={{marginBottom: "1rem"}}>
	<h1>Software anecdotes</h1>
	<nav>
		<ul className="nav nav-tabs">
			<li className="nav-item">
				<NavLink className="nav-link" exact to="/">Anecdotes</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" exact to="/create">Create new</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" exact to="/about">About</NavLink>
			</li>
		</ul>
	</nav>
</header>

export default Header
