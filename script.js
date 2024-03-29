const containerEle = document.querySelector(".container");
const apiKey = "6e9991698ea744fb753bb988bebf4a12";
const cityName = "Calgary";

async function fetchDataAndDisplay() {
    try {
        const weatherData = await getWeatherData(cityName);
        if (weatherData && weatherData.main && weatherData.main.temp && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description) {
            displayWeatherInfo(weatherData);
        } else {
            displayErrorMessage("Weather Information is not Available");
        }
    } catch (error) {
        displayErrorMessage("Weather Information is not Available");
       
    }
}

fetchDataAndDisplay();

async function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    containerEle.textContent = "";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273).toFixed(0)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `${description}`;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    containerEle.appendChild(cityDisplay);
    containerEle.appendChild(tempDisplay);
    containerEle.appendChild(humidityDisplay);
    containerEle.appendChild(descDisplay);
}

function displayErrorMessage(message) {
    containerEle.textContent = ""; // Clear previous content
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorDisplay");
    containerEle.appendChild(errorMessage);
}
