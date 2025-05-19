const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  
  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(
      https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
});
function displayWeather(data) {
  cityName.textContent = data.name;
  description.textContent = data.weather[0].description;
  temperature.textContent = data.main.temp.toFixed(1);
  humidity.textContent = data.main.humidity;

  weatherResult.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  weatherResult.classList.add('hidden');
}