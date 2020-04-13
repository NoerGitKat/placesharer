const jwt = require('jsonwebtoken');
const HttpError = require('./../models/http-error');

// Custom middleware for Express to check authentication
const checkAuth = (req, res, next) => {
  const { token } = req.headers.authorization;
  try {
    // Check if there's a token received from client headers
    if (!token) {
      throw new Error('Error at authentication!');
    }
    const decodedToken = jwt.verify(`Bearer ${token}`, 'supersecretman!');
    // If token is verified add to request logged in user data
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed! Log in again.', 401);
    next(error);
  }

  return;
};

module.exports = checkAuth;
