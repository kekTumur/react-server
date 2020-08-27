import React from 'react';
import './item-list.css';

const ItemList = (props) => {

	const {data, children, onItemSelected} = props;

	const items = (
		data.map((item) => {
			const {id} = item;
			const name = children(item);
			return (
				<li 
					className="list-group-item"
					key={id}
					onClick={() => onItemSelected(id)}>
						{name}
				</li>
			);
		})
	);

	return (
		<ul className="item-list list-group">
			{items}
		</ul>
	);
}

export default ItemList;
