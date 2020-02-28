const express = require('express');
const app = express();

const { errorHandler } = require('./middlewares/errorHandler');
const { errorNoRoute } = require('./middlewares/errorHandler');

// Routes
const placeRouter = require('./routes/placeRouter.js');
const userRouter = require('./routes/userRouter.js');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/places', placeRouter);
app.use('/api/users', userRouter);

// General error handling if route doesn't exist
app.use(errorNoRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}!`);
});
