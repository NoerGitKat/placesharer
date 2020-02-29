const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('./../models/http-error');

const DUMMY_USERS = [
	{ id: 'u1', name: 'User1', email: 'u1@email.com', password: 'wassup' },
	{ id: 'u2', name: 'some mafaka', email: 'mafaka@gmail.com', password: 'asdasdas' },
];

const getAllUsers = (req, res) => {
	res.status(200).json(DUMMY_USERS);
};

const createUser = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Make sure to pass in the correct data!', 422);
	}
	const { name, email, password } = req.body;

	// Check if email already exists
	const emailExists = DUMMY_USERS.find(user => user.email === email);
	if (emailExists) {
		throw new HttpError('Email already exists!', 422);
	}

	// Create new user
	const newUser = { id: uuid.v4(), name, email, password };

	// Save user
	DUMMY_USERS.push(newUser);

	res.status(201).json(DUMMY_USERS);
};

const logUserIn = (req, res) => {
	const { email, password } = req.body;

	// Check if user exists
	const identifiedUser = DUMMY_USERS.find(user => user.email === email);
	console.log();

	if (!identifiedUser || identifiedUser.password !== password) {
		throw new HttpError('Credentials are incorrect!', 401);
	}

	res.status(200).json(identifiedUser);
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.logUserIn = logUserIn;
