const modifyRequest = (req, res, next) => {
	modifiedReqObject = {};
	Object.keys(req.body).map(function(key, index) {
		modifiedReqObject[key.replace(/\s+/g, '_').toLowerCase()] = req.body[key];
	});

	req.body = modifiedReqObject;
	next();
}

module.exports = {
	modifyRequest: modifyRequest
}