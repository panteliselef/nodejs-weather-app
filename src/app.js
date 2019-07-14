const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Elefcodes'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'elefcodes'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'help Page',
		name: 'elefcodes',
		message: 'this is a test'
	});
});

app.get('/weather', ({ query }, res) => {
	if (!query.address) {
		return res.json({
			error: 'You must provide an address'
		});
	}

	geocode(query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.json({
				error
			});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.json({
					error
				});
			}

			res.json({
				forecastData,
				location,
				address:query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'elefcodes',
		message: 'Help article not found.'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'elefcodes',
		message: 'Page not found.'
	});
});
app.listen(3000, () => {
	console.log('App is running at port 3000');
});
