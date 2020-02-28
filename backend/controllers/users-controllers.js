const uuid = require('uuid/v4');

const HttpError = require('./../models/http-error');

const DUMMY_USERS = [
	{ id: 'u1', name: 'User1', email: 'u1@email.com', password: 'wassup' },
	{ id: 'u2', name: 'some mafaka', email: 'mafaka@gmail.com', password: 'asdasdas' },
];

const getAllUsers = (req, res) => {
	res.status(200).json(DUMMY_USERS);
};
const createUser = (req, res) => {
	const { name, email, password } = req.body;

	// Check if email already exists
	const emailExists = DUMMY_USERS.find(user => user.email === email);
	if (emailExists) {
		const error = new HttpError('Email already exists!', 422);
		throw error;
	}

	// Create new user
	const newUser = { id: uuid(), name, email, password };

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
		const error = new HttpError('Credentials are incorrect!', 401);
		throw error;
	}

	res.status(200).json(identifiedUser);
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.logUserIn = logUserIn;
