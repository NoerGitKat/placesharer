const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('./../models/http-error');
const User = require('./../models/User');

const hashPassword = require('./../util/hashPassword');
const comparePassword = require('./../util/comparePassword');

const getAllUsers = async (req, res, next) => {
	let users;
	try {
		// Find all users, return without password
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError('Something went wrong, could not find users.', 500);
		return next(error);
	}

	// Respond with users in JS format
	const modifiedUsers = users.map(user => user.toObject({ getters: true }));
	res.status(200).json(modifiedUsers);
};

const createUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		const error = new HttpError('Make sure to pass in the correct data!', 422);
		return next(error);
	}
	const { name, email, password } = req.body;

	let emailExists;
	try {
		// Check if email already exists
		emailExists = await User.findOne({ email });
	} catch (err) {
		const error = new HttpError('Something went wrong, could not create user!', 500);
		return next(error);
	}

	if (emailExists) {
		const error = new HttpError('Email already exists, please login instead!', 422);
		return next(error);
	}

	// Hash password
	const hashedPassword = hashPassword(password);

	// Create new user
	const newUser = new User({
		name,
		email,
		image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
		password: hashedPassword,
		places: [],
	});

	try {
		// Save user
		await newUser.save();
	} catch (err) {
		console.log('err', err);
		const error = new HttpError('Something went wrong, could not create user!', 500);
		return next(error);
	}

	const modifiedUser = newUser.toObject({ getters: true });

	res.status(201).json(modifiedUser);
};

const logUserIn = async (req, res, next) => {
	const { email, password } = req.body;

	let identifiedUser;
	try {
		// Check if user exists
		identifiedUser = await User.findOne({ email });
	} catch (err) {
		const error = new HttpError('Something went wrong, could not find user!', 500);
		return next(error);
	}

	if (!identifiedUser || !isPasswordCorrect) {
		const error = new HttpError('Credentials are incorrect!', 401);
		return next(error);
	}

	const isPasswordCorrect = comparePassword(password, identifiedUser.password);

	const modifiedUser = identifiedUser.toObject({ getters: true });
	res.status(200).json(modifiedUser);
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.logUserIn = logUserIn;
