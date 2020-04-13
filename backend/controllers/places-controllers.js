const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const HttpError = require('./../models/http-error');
const getCoordsForAddress = require('./../util/location');
const Place = require('./../models/Place');
const User = require('./../models/User');

const getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find places!',
      500
    );
    return next(error);
  }

  if (places.length > 0) {
    return res.status(200).json(places);
  } else {
    const error = new HttpError('Could not find any places!', 404);
    return next(error);
  }
};

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;
  let foundPlace;
  try {
    foundPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find place.',
      500
    );
    return next(error);
  }
  if (!foundPlace) {
    const error = new HttpError(
      'Could not find a place with the provided place ID!',
      404
    );
    return next(error);
  }
  // Make "id" property available
  const modifiedPlace = foundPlace.toObject({ getters: true });
  return res.status(200).json(modifiedPlace);
};

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find places.',
      500
    );
    return next(error);
  }

  if (places.length > 0) {
    // Make "id" property available
    const modifiedPlaces = places.map((place) =>
      place.toObject({ getters: true })
    );
    return res.status(200).json(modifiedPlaces);
  } else {
    const error = new HttpError(
      'Could not find places with the provided user ID!',
      404
    );
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
  const { path } = req.file;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title: title,
    description: description,
    location: coordinates,
    image: path,
    address: address,
    creator,
  });

  console.log('createdPlace', createdPlace);

  let user;
  // Store place in User
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Something went wrong, can not find user', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user with provided id.', 404);
    return next(error);
  }

  try {
    // Save new place + save place id into user
    const session = await mongoose.startSession();
    session.startTransaction(); // Transactions let you execute multiple operations in isolation and potentially undo all the operations if one of them fails.
    await createdPlace.save({ session });
    user.places.push(createdPlace); // Mongoose method to push document into array
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Failed to create new place, make sure to fill in all the fields correctly!',
      500
    );
    return next(error);
  }

  const modifiedPlace = createdPlace.toObject({ getters: true });
  res.status(201).json(modifiedPlace);
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError('The input is incorrect!');
    return next(error);
  }
  // Only allow title and description to be updated
  const { title, description } = req.body;

  console.log('what is title', title);

  const { placeId } = req.params;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  console.log('what is place now', place);

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  const modifiedPlace = place.toObject({ getters: true });
  console.log('modified place', modifiedPlace);
  res.status(200).json(modifiedPlace);
};

const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator'); // Add User document
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Place does not exist!');
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session });
    place.creator.places.pull(place); // Mongoose method that removes objectId
    await place.creator.save({ session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ msg: 'Place successfully deleted!' });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
