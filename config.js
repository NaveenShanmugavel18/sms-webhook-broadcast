const foodPandaUrl	= `mongodb://${encodeURIComponent('admin@123')}:${encodeURIComponent('admin@123')}@ds255282.mlab.com:55282/mongodb_production`;
	smsGatewayUrl	= `https://leado-mini-project-api.herokuapp.com/sendSms`;
	smsGatewayAccess= `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2h5YW0ifQ.a9R1PRhBuYObDt3nSrkqO58emrv4-HLbVKqfz56tf5U`;

module.exports = {
	url: foodPandaUrl,
	smsUrl: smsGatewayUrl,
	smsKey: smsGatewayAccess
}