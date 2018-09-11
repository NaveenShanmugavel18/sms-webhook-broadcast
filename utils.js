const crypto = require('crypto');

const stringToSnakeCase = (str) => {
	return str.replace(/\s+/g, '_').toLowerCase();
}

const generateRandomString = () => {
	return crypto.randomBytes(16).toString('hex');
}

module.exports = {
	stringToSnakeCase: stringToSnakeCase,
	randomString: generateRandomString
}