const express = require('express');
const app = express();

const errorHandler = require('./middlewares/errorHandler');

// Routes
const placeRouter = require('./routes/placeRouter.js');

// Middlewares
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/places', placeRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}!`);
});
