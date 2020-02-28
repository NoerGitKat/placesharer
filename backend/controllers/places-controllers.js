const HttpError = require('./../models/http-error');

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

const getPlaceById = (req, res) => {
	const { placeId } = req.params;
	const place = DUMMY_PLACES.find(place => place.id === placeId);
	if (place) {
		res.status(200).json(place);
	} else {
		const error = new HttpError('Could not find a place with the provided place ID!', 404);
		throw error;
	}
};

const getPlaceByUserId = (req, res, next) => {
	const { userId } = req.params;

	const place = DUMMY_PLACES.find(place => place.creator === userId);

	if (place) {
		res.status(200).json(place);
	} else {
		const error = new HttpError('Could not find a place with the provided user ID!', 404);
		next(error);
	}
};

exports.getPlaceById = getPlaceById;

exports.getPlaceByUserId = getPlaceByUserId;
