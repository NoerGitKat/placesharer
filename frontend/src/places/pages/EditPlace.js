import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import Card from './../../shared/components/UIElements/Card';
import PlaceForm from './../components/PlaceForm';



import useForm from './../../shared/hooks/form-hook';

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
	const [isLoading, setIsLoading] = useState(true);
	const { placeId } = useParams();

	const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

	const initInputs = {
		title: {
			value: '',
			isValid: true,
		},
		description: {
			value: '',
			isValid: true,
		},
	};
	const [formState, inputHandler, setFormData] = useForm(initInputs, false);

	useEffect(() => {
		if (identifiedPlace) {
			setFormData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, identifiedPlace]);

	if (!identifiedPlace) {
		return (
			<div className="center">
				<Card>
					<h2>Couldn't find place!</h2>
				</Card>
			</div>
		);
	}

	const editPlaceSubmitHandler = e => {
		e.preventDefault();
	};

	if (isLoading) {
		return <div className="center">Loading...</div>;
	}

	return (
		<PlaceForm
			formState={formState}
			inputHandler={inputHandler}
			formHandler={editPlaceSubmitHandler}
			isAdd={false}
		/>
	);
};

export default EditPlace;
