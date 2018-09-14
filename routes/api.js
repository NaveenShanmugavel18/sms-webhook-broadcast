const express = require('express');
	router = express.Router();
	utils = require('../utils');
	config = require('../config');
	middleware = require('../middleware');
	mongoClient = require('mongodb').MongoClient;
	request = require('request-promise');

/* GET webhook data */
router.get('/webhook/:apiKey', (req, res, next) => {
	
	utils.getMongoConnection().then(db => {
		return db.collection('webhooks').findOne({apiEndpoint : req.params.apiKey}, { filtersPassed: 1, webHookHitCount: 1, smsCount: 1, _id: 0 })
	})
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json({ status: 'failure', statusCode: 422})
	})
});

/* POST webhook data */
router.post('/webhook/:apiKey', middleware.modifyRequest, (req, res, next) => {

	utils.getMongoConnection()
		.then(db => {
			increment = {
				webHookHitCount : 1,
			}
			dbo = db.db('mongodb_production')
			return db.collection('webhooks').findOne({apiEndpoint : req.params.apiKey})
		})
		.then(data => {
			var isFilterApplicable = utils.checkFilter(req.body, data);
			
			if(isFilterApplicable) {
				increment.filtersPassed = 1;
				increment.smsCount = 1;
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
				increment.filtersPassed = 0;
				increment.smsCount = 0;

				return new Promise((resolve, reject) => {
					resolve(increment);
				});
			}
		})
		.then(data => {
			return dbo.collection('webhooks').update({apiEndpoint : req.params.apiKey}, {$inc : increment});
		})
		.then(data => {
			res.json({ status: 'success', statusCode: 200, message: '' });
		})
		.catch(err => {
			res.json({ status: 'failure', statusCode: 422, message: 'Filter not statisfied.' });
		});
});

module.exports = router;
