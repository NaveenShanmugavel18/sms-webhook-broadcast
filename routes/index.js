const express = require('express');
	router = express.Router();
	config = require('../config');
	utils = require('../utils');
	mongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Webhook SMS' });
});

router.post('/', (req, res, next) => {
	var data = {
		"filterKey": utils.stringToSnakeCase(req.body.filterKey),
		"filterValue": req.body.filterValue,
		"operator": req.body.operators,
		"senderSms": utils.stringToSnakeCase(req.body.smsKey),
		"smsBody": req.body.smsBody,
		"apiEndpoint": utils.randomString()
	}

	mongoClient.connect(config.url)
		.then(db => {
			return db.collection('webhooks').insert(data)
		})
		.then(dbres => {
			res.render('endpoint', {
				title: `API Endpoint`,
				url: `${req.protocol}://${req.get('Host')}${req.url}api/webhook/${dbres.ops[0].apiEndpoint}`
			});
		})
		.catch(err => {
			res.json({ status: 'failure', statusCode: 422, message: 'Filter not statisfied.' });
		});
});

module.exports = router;
