import React from 'react';
import './item-details.css';

const Record = ({data, field, label}) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{data[field]}</span>
		</li>
	);
}

const ItemDetails = (props) => {

	const {data, image, children} = props;

	if (!data) {
		return <div className="alert alert-light" role="alert">Select item from list</div>
	}

	const { name } = data;

	return (
		<div className="person-details card">
			<img className="person-image"
			src={image} alt="person"/>

			<div className="card-body">
			<h4>{name}</h4>
			<ul className="list-group list-group-flush">
				{
					React.Children.map(children, (child) => {
						return React.cloneElement(child, {data});
					})
				}
			</ul>
			</div>
		</div>
	);
}

export default ItemDetails;
export {
	Record
};

