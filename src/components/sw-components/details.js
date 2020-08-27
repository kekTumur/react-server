import React from 'react'
import ItemDetails, {Record} from '../item-details/item-details';
import swapi from '../../services/swapi';
import withDataDetails from '../hoc-helpers/with-data-details';

const SwapiService = new swapi();

const {
    getPerson,
    getStarship,
    getPlanet,
    getPersonImage,
    getStarshipImage,
    getPlanetImage
} = SwapiService;

const withChildFunction = (Wrapped, ...comp) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {comp}
            </Wrapped>
        );
    }
};

const  PersonDetails = withDataDetails(withChildFunction(ItemDetails, 
    <Record field="gender" label="Gender" />,
    <Record field="eyeColor" label="Eye color"/>), 
    getPerson, getPersonImage);

const  PlanetDetails = withDataDetails(withChildFunction(ItemDetails,
    <Record field="population" label="Population" />,
    <Record field="diameter" label="Diameter" />), getPlanet, getPlanetImage);
    
const  StarshipDetails = withDataDetails(withChildFunction(ItemDetails,
    <Record field="costInCredits" label="Cost" />,
    <Record field="length" label="Length" />), getStarship, getStarshipImage);

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
};