const express = require('express');

const placesRouter = express.Router();

// Controllers
const { getPlaceById } = require('./../controllers/places-controllers');
const { getPlaceByUserId } = require('./../controllers/places-controllers');
const { createPlace } = require('./../controllers/places-controllers');

placesRouter
	.route('/')
	.get((req, res) => res.json({ msg: 'it works!' }))
	.post(createPlace);

placesRouter.route('/:placeId').get(getPlaceById);

placesRouter.route('/user/:userId').get(getPlaceByUserId);

module.exports = placesRouter;
