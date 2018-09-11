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
		"filterKey": req.body.filterKey,
		"filterValue": req.body.filterValue,
		"operator": req.body.operators,
		"senderSms": req.body.smsKey,
		"smsBody": req.body.smsBody,
		"apiEndpoint": utils.randomString()
	}

	mongoClient.connect(config.url, function(err, db) {
		/*if (err) {
			res.render('questions', { 
				title: 'Stackoverflow Data Visualization',
				message: `Connect to your db and try again`
			});
		}*/
		db.collection('webhooks').insert(data, function(err, dbres) {
			if (err) throw err;
			console.log(dbres.ops);
			res.json(data);
			/*for (let item of dbres.ops) {
				questionTags.push(item.item);
				questionCount.push(item.count);
			}
			res.render('questions', { 
				title: `Featured question Visualization`,
				questionTags: questionTags,
				questionCount: questionCount,
				chartTitle: `Featured question tag wise`
			});*/
	  	});
	});

	// res.json(data);
});

module.exports = router;
