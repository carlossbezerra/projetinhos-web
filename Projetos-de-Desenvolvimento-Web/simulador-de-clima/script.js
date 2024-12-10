const weatherIcon = document.getElementById('weather-icon');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const updateButton = document.getElementById('update-weather');

const weatherConditions = [
  { icon: '☀️', temperature: 25, condition: 'Ensolarado' },
  { icon: '☁️', temperature: 18, condition: 'Nublado' },
  { icon: '🌧️', temperature: 12, condition: 'Chuvoso' },
  { icon: '❄️', temperature: -2, condition: 'Nevado' }
];


function updateWeather() {
  const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  weatherIcon.textContent = randomCondition.icon;
  temperatureDisplay.textContent = `${randomCondition.temperature}°C`;
  conditionDisplay.textContent = randomCondition.condition;
}


updateButton.addEventListener('click', updateWeather);

updateWeather(); // Mostra um clima ao carregar a página