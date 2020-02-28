const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('./../models/http-error');
const getCoordsForAddress = require('./../util/location');

let DUMMY_PLACES = [
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
		id: 'panotherplace',
		title: 'Empire State',
		description: 'The same famous shit right here!',
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
		throw new HttpError('Could not find a place with the provided place ID!', 404);
	}
};

const getPlacesByUserId = (req, res, next) => {
	const { userId } = req.params;

	const places = DUMMY_PLACES.filter(place => place.creator === userId);

	console.log('places', places);

	if (places.length > 0) {
		res.status(200).json(places);
	} else {
		throw new HttpError('Could not find places with the provided user ID!', 404);
		return next(error);
	}
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		next(new HttpError('The input is incorrect!'));
	}

	const { title, description, address, creator } = req.body;

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}

	const createdPlace = { id: uuid(), title, description, location: coordinates, address, creator };

	// Push to fake DB
	DUMMY_PLACES.push(createdPlace);

	res.status(201).json(DUMMY_PLACES);
};

const updatePlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('The input is incorrect!');
	}
	// Only allow title and description to be updated
	const { title, description } = req.body;

	const { placeId } = req.params;

	// 1. Search through array for match
	const updatedPlace = DUMMY_PLACES.find(place => place.id === placeId);

	const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

	// 2. Update place in copy
	updatedPlace.title = title;
	updatedPlace.description = description;

	// 3. Replace old with updated copy
	DUMMY_PLACES[placeIndex] = updatedPlace;

	res.status(200).json(DUMMY_PLACES);
};

const deletePlace = (req, res, next) => {
	const { placeId } = req.params;

	const foundPlace = DUMMY_PLACES.find(place => place.id === placeId);
	if (!foundPlace) {
		throw new HttpError('Place does not exist!');
	}

	DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

	res.status(200).json(DUMMY_PLACES);
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
