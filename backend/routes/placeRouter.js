const express = require('express');

const placesRouter = express.Router();

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
];

placesRouter.route('/').get((req, res) => res.status(200).json({ msg: 'it works!' }));

placesRouter.route('/:placeId').get((req, res) => {
	const { placeId } = req.params;
	const place = DUMMY_PLACES.find(place => place.id === placeId);
	if (place) {
		res.status(200).json(place);
	} else {
		res.status(404).json({ msg: 'Didnt find any places for the provided place ID!' });
	}
});

placesRouter.route('/user/:userId').get((req, res) => {
	const { userId } = req.params;

	const place = DUMMY_PLACES.find(place => place.creator === userId);

	if (place) {
		res.status(200).json(place);
	} else {
		res.status(404).json({ msg: 'Didnt find any places for the provided user ID!' });
	}
});

module.exports = placesRouter;
