const express = require('express');

const placesRouter = express.Router();

// Controllers
const { getPlaceById } = require('./../controllers/places-controllers');
const { getPlacesByUserId } = require('./../controllers/places-controllers');
const { createPlace } = require('./../controllers/places-controllers');
const { updatePlace } = require('./../controllers/places-controllers');
const { deletePlace } = require('./../controllers/places-controllers');

placesRouter
	.route('/')
	.get((req, res) => res.json({ msg: 'it works!' }))
	.post(createPlace);

placesRouter
	.route('/:placeId')
	.get(getPlaceById)
	.patch(updatePlace)
	.delete(deletePlace);

placesRouter.route('/user/:userId').get(getPlacesByUserId);

module.exports = placesRouter;
