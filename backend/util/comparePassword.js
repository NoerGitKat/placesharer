const bcrypt = require('bcrypt');

const comparePassword = (password, hash) => {
	const isCorrect = bcrypt.compareSync(password, hash);
	return isCorrect;
};

module.exports = comparePassword;
