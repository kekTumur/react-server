import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import swapi from '../../services/swapi';
import Row from '../row';
import ErrorBoundary from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {

	swapi = new swapi();

	state = {
		selectedPerson: 20
	};

	onPersonSelected = id => {
		this.setState({
		  selectedPerson: id
		});
	  }

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator />
		}

		const itemList = (
			<ItemList 
				getData={this.swapi.getAllPeople}
				onItemSelected={this.onPersonSelected}>

				{({name, birthYear}) => {
					return `${name}, (${birthYear})`;
				}}			

			</ItemList>
		);

		const personDetails = (
			<ErrorBoundary>
				<ItemDetails itemId={this.state.selectedPerson}/>
			</ErrorBoundary>
		);

		return (
			<Row left={itemList} right={personDetails} />
		);
	}
}
