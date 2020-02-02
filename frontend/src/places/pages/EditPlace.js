import React from 'react';
import { useParams } from 'react-router-dom';

import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from './../../shared/utils/validators';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State',
		description: 'Famous shit right here!',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Empire State 2',
		description: 'Another famous shit right here!',
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u2',
	},
];

const EditPlace = () => {
	const { placeId } = useParams();

	const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

	if (!identifiedPlace) {
		return (
			<div className="center">
				<h2>Couldn't find place!</h2>
			</div>
		);
	}

	console.log(identifiedPlace);

	return (
		<form className="place-form">
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				errorText="Please enter a valid title!"
				validators={[VALIDATOR_REQUIRE()]}
				onInputChange={() => {}}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				errorText="Please enter a valid description (at least 5 characters!"
				validators={[VALIDATOR_MINLENGTH(5)]}
				onInputChange={() => {}}
			/>
			<Button type="submit">Update place</Button>
		</form>
	);
};

export default EditPlace;
