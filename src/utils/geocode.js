// const request = require('request');
const https = require('https');

const geocode = (address, callback) => {
	const accessTokenMapBox =
		'pk.eyJ1IjoiZWxlZmNvZGVzIiwiYSI6ImNqdnoyemtnaTBjaGo0OG1uMmVhZWlkdzkifQ.I0WGnZdw3YHylb86dAPk3Q';
	const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${accessTokenMapBox}`;

	const request = https.request(mapBoxURL, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data = data.concat(chunk.toString());
		});

		response.on('end', () => {
			const body = JSON.parse(data);
			const { features } = body;
			if (features.length === 0) {
				callback('Unable to find location !', undefined);
			} else {
				callback(undefined, {
					latitude: features[0].center[1],
					longitude: features[0].center[0],
					location: features[0].place_name
				});
			}
		});
	});

	request.on('error', (error) => {
		callback('Unable to connect to location service !', undefined);
	});
	request.end();
	// request({ url: mapBoxURL, json: true }, (error, {body}) => {
	// 	if (error) {
	// 		callback('Unable to connect to location service !', undefined);
	// 	} else if (body.features.length === 0) {
	// 		callback('Unable to find location !', undefined);
	// 	} else {
	// 		callback(undefined, {
	// 			latitude: body.features[0].center[1],
	// 			longitude: body.features[0].center[0],
	// 			location: body.features[0].place_name
	// 		});
	// 	}
	// });
};

module.exports = geocode;
