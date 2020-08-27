import React, { Component } from 'react';
import Header from '../header';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';
import './app.css';
import ErrorIndicator from '../error-indicator';
import swapi from '../../services/swapi';

export default class App extends Component {

	swapi = new swapi();

	constructor() {
			super();
			this.state = {
				showRandomPlanet: true,
				hasError: false
			};
	}

	componentDidCatch() {
		this.setState({
			hasError: true
		});
	}

	togglePlanet = () => {
		this.setState(({showRandomPlanet}) => {
			return {
				showRandomPlanet: !showRandomPlanet
			};
		});
	}


  	render() {
		const {showRandomPlanet, hasError} = this.state;

		if (hasError) {
			return <ErrorIndicator />
		}

		return (
			<SwapiServiceProvider value={this.swapi}>
				<div className="container">
					<Header />

					<PersonDetails itemId={12} />
					<PlanetDetails itemId={2} /> 
					<StarshipDetails itemId={13} />
							
					<PersonList />
					<PlanetList />
					<StarshipList />
				</div>
			</SwapiServiceProvider>
		);
	}
};


// {showRandomPlanet ? <RandomPlanet /> : null}
//         <button 
//           className="toggle-planet btn btn-warning"
//           onClick={this.togglePlanet}
//           >Toggle Random Planet
//         </button>
//         <ErrorButton />
//         <PeoplePage />