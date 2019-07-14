const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const secretKey = 'db56443db5b1311730d159202c4f819e';
	const url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}?units=si`;

	request(
		{
			url: url,
			json: true
		}, 
		(error, {body}) => {
			if (error) {
				callback('Unable to connect to weather service !', undefined);
			} else if (body.error) {
				callback('Unable to find location !', undefined);
			} else {
				callback(undefined, body.currently);
			}
		}
	);
};

module.exports = forecast;