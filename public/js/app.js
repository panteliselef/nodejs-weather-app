console.log('YEAH');

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = document.querySelector('input').value;
	const messageOne = document.getElementById('message-1');
  const messageTwo = document.getElementById('message-2');
  
	messageOne.textContent = 'Loading ...';
  messageTwo.textContent = '';
  
	fetch(`http://localhost:3000/weather?address=${searchTerm}`)
		.then((res) => res.json())
		.then(({ error, location, forecastData }) => {
			if (error) return messageOne.textContent = error;

			const { summary, temperature, precipProbability } = forecastData;
			messageOne.textContent = `${summary} throughout the day. It is currently ${temperature} degrees Celcius. There is a ${precipProbability}% chance of rain.`;
			messageTwo.textContent = location;
		});
});
