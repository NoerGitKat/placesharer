const express = require('express');

const placesRouter = express.Router();

// Controllers
const { getAllPlaces } = require('./../controllers/places-controllers');
const { getPlaceById } = require('./../controllers/places-controllers');
const { getPlacesByUserId } = require('./../controllers/places-controllers');
const { createPlace } = require('./../controllers/places-controllers');
const { updatePlace } = require('./../controllers/places-controllers');
const { deletePlace } = require('./../controllers/places-controllers');

// Validators
const validateCreatePlace = require('./../middlewares/validation/validateCreatePlace');
const validateUpdatePlace = require('./../middlewares/validation/validateUpdatePlace');

placesRouter
	.route('/')
	.get(getAllPlaces)
	.post(validateCreatePlace, createPlace);

placesRouter
	.route('/:placeId')
	.get(getPlaceById)
	.patch(validateUpdatePlace, updatePlace)
	.delete(deletePlace);

placesRouter.route('/user/:userId').get(getPlacesByUserId);

module.exports = placesRouter;
