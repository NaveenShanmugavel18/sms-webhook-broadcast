const foodPandaUrl	= "mongodb://localhost:27017/foodpanda";
	smsGatewayUrl	= "https://leado-mini-project-api.herokuapp.com/sendSms";
	smsGatewayAccess= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2h5YW0ifQ.a9R1PRhBuYObDt3nSrkqO58emrv4-HLbVKqfz56tf5U";

module.exports = {
	url: foodPandaUrl,
	smsUrl: smsGatewayUrl,
	smsKey: smsGatewayAccess
}