const crypto = require('crypto');
	config = require('./config');
	mongoClient = require('mongodb').MongoClient;

const stringToSnakeCase = (str) => {
	return str.replace(/\s+/g, '_').toLowerCase();
}

const generateRandomString = () => {
	return crypto.randomBytes(16).toString('hex');
}

const checkFilter = (req, db) => {
	var dbFilterField = db.filterKey;
	var dbFilterValue = db.filterValue;
	var dbFilterOperator = db.operator;
	
	if(!req[dbFilterField]) {
		return false;
	}

	var reqFilterValue = req[dbFilterField];
	var status = false;
	
	switch(dbFilterOperator) {
		case 'gt':
			if(parseInt(reqFilterValue) > parseInt(dbFilterValue)) {
				status = true;
			}
			break;

		case 'equal':
			if(parseInt(reqFilterValue) === parseInt(dbFilterValue)) {
				status = true;
			}
			break;

		case 'neq':
			if(parseInt(reqFilterValue) != parseInt(dbFilterValue)) {
				status = true;
			}
			break;

		case 'contains':
			if(reqFilterValue.includes(dbFilterValue)) {
				status = true;
			}
			break;

		case 'lt':
			if(parseInt(reqFilterValue) < parseInt(dbFilterValue)) {
				status = true;
			}
			break;
	}

	return status;
}

const getMongoConnection = () => {
	return mongoClient.connect(config.url);
}

module.exports = {
	randomString: generateRandomString,
	stringToSnakeCase: stringToSnakeCase,
	checkFilter: checkFilter,
	getMongoConnection: getMongoConnection
}