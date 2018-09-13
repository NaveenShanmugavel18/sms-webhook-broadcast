const express = require('express');
	router = express.Router();
	utils = require('../utils');
	config = require('../config');
	middleware = require('../middleware');
	mongoClient = require('mongodb').MongoClient;
	request = require('request-promise');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.post('/webhook/:apiKey', middleware.modifyRequest, (req, res, next) => {

	mongoClient.connect(config.url)
		.then(db => {
			return db.collection('webhooks').findOne({apiEndpoint : req.params.apiKey})
		})
		.then(data => {
			var isFilterApplicable = utils.checkFilter(req.body, data);
			
			if(isFilterApplicable) {
				const options = {
					method: 'POST',
					uri: config.smsUrl,
					headers: {
						'x-access-token': config.smsKey,
						'Content-Type': 'application/json'
					},
					body: {
						'toNumber': req.body[data.senderSms],
						'smsText': data.smsBody
					},
					json: true
				}
				return request(options)
			} else {
				throw err;
			}
		})
		.then(data => {
			res.json({ status: 'success', statusCode: 200, message: '' });
		})
		.catch(err => {
			res.json({ status: 'failure', statusCode: 422, message: 'Filter not statisfied.' });
		});
});

module.exports = router;
