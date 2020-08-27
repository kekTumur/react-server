import React, { Component } from 'react';
import swapi from '../../services/swapi';
import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {
	
	componentDidMount() {
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	swapi = new swapi();

	state = {
		planet: {},
		loading: true,
		error: false
	};

	onPlanetLoaded = (planet) => {
		this.setState({ 
			planet,
			loading: false 
		});
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		});
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random() * 25 + 2);
		this.swapi.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

  render() {
	const { planet, loading, error } = this.state;

	const hasData = !(loading || error);

	const spinner = loading ? <Spinner /> : null,
		  content = hasData ? <PlanetView planet={planet} /> : null,
		  errorMessage = error ? <ErrorIndicator /> : null;

    return (
		<div className="random-planet jumbotron rounded">
			{spinner}
			{content}
			{errorMessage}
      	</div>
    );
  }
}

const PlanetView = ({ planet }) => {

	const {id, name, population, rotationPeriod, diameter} = planet;

	return (
		<React.Fragment>
			<img className="planet-image"
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet"/>
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
				<li className="list-group-item">
					<span className="term">Population</span>
					<span>{population}</span>
				</li>
				<li className="list-group-item">
					<span className="term">Rotation Period</span>
					<span>{rotationPeriod}</span>
				</li>
				<li className="list-group-item">
					<span className="term">Diameter</span>
					<span>{diameter}</span>
				</li>
				</ul>
			</div>
		</React.Fragment>
	)
}
