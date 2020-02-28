const HttpError = require('./../models/http-error');

const errorHandler = (error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500).json({ msg: error.message || 'An unknown error occurred!' });
};

const errorNoRoute = (req, res, next) => {
	const error = new HttpError('Could not find this route', 404);
	throw error;
};

exports.errorHandler = errorHandler;
exports.errorNoRoute = errorNoRoute;
