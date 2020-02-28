const errorHandler = (error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500).json({ msg: error.message || 'An unknown error occurred!' });
};

module.exports = errorHandler;
