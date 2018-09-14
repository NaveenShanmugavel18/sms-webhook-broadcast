const express = require('express');
	router = express.Router();
	config = require('../config');
	utils = require('../utils');

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
		"apiEndpoint": utils.randomString(),
		"smsCount": Number(0),
		"webHookHitCount": Number(0),
		"filtersPassed": Number(0)
	}

	utils.getMongoConnection()
		.then(db => {
			console.log('db', db);
			return db.collection('webhooks').insert(data)
		})
		.then(dbres => {
			console.log('dbres', dbres);
			res.render('endpoint', {
				title: `API Endpoint`,
				url: `${req.protocol}://${req.get('Host')}${req.url}api/webhook/${dbres.ops[0].apiEndpoint}`
			});
		})
		.catch(err => {
			console.log('error', err);
			res.json({ status: 'failure', statusCode: 424, message: 'Please connect your db and try again' });
		});
});

module.exports = router;
