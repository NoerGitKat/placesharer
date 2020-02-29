const mongoose = require('mongoose');

const connectDB = server => {
	mongoose
		.connect('mongodb+srv://Noer:PrDBQHK6j7mShpjF@cluster0-jtuqz.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => server)
		.catch(err => console.log('err happened in db connection!', err));
};

module.exports = connectDB;
