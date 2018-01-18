import React from "react"
import ReactDOM from "react-dom"
import axios from "axios/index"

const Country = country => <div onClick={() => country.expand(country)}>
	{country.name}
</div>

const FullCountry = country => <div>
	<h1>{country.name}</h1>
	<p onClick={country.close}>Click here to close</p>
	<p>
		Capital: {country.capital}
	</p><p>
		Population: {country.population}
	</p>
	<img width="100%" src={country.flag} alt="Flag"></img>
</div>

class Countries extends React.PureComponent {
	render() {
		return <div>
			{this.props.countries
				.filter(country => country.name.toLowerCase().includes(this.props.filter))
				.map(country => <Country key={country.alpha2Code} expand={this.props.expand} {...country}/>)}
		</div>
	}
}

class App extends React.Component {
	constructor() {
		super()
		this.state = {filter: "", countries: [], expanded: undefined}
	}

	async componentWillMount() {
		const response = await axios.get("https://restcountries.eu/rest/v2/all")
		this.setState({countries: response.data})
		console.log(response.data)
	}

	filterChanged = (evt) => {
		this.setState({
			filter: evt.target.value.toLowerCase()
		})
	}

	expand = (country) => {
		this.setState({expanded: country})
	}

	close = () => {
		this.setState({expanded: undefined})
	}

	render() {
		return <div>
			find countries: <input value={this.state.filter} onChange={this.filterChanged}/>
			{this.state.expanded
				? <FullCountry close={this.close} {...this.state.expanded}/>
				: <Countries countries={this.state.countries} filter={this.state.filter} expand={this.expand}/>}
		</div>
	}
}

ReactDOM.render(<App/>, document.getElementById("root"))
