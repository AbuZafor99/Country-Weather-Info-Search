const countryDataApi = 'https://restcountries.com/v3.1/name/';
const weatherDataApi = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = '4549d4ded84890898c9b508309ca5e0c';

async function getCountryData() {
    const countryName = document.getElementById('country-name').value.trim();
    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }

    try {
        const countryResponse = await fetch(`${countryDataApi}${countryName}`);
        if (!countryResponse.ok) {
            throw new Error('Country not found!');
        }
        const countryData = await countryResponse.json();

        const country = countryData[0];
        const weatherResponse = await fetch(`${weatherDataApi}?q=${countryName}&appid=${weatherApiKey}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error('Weather data not found!');
        }
        const weatherData = await weatherResponse.json();

        displayResults(country, weatherData);
    } catch (error) {
        alert(error.message);
    }
}

function displayResults(country, weatherData) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    const cardContainer = document.createElement('div');
    cardContainer.style.display = 'flex';
    cardContainer.style.gap = '20px';

    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');
    countryCard.style.flex = '1';
    countryCard.style.border = '1px solid #e0e0e0';
    countryCard.style.borderRadius = '12px';
    countryCard.style.padding = '16px';
    countryCard.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    countryCard.style.backgroundColor = '#2596be';
    countryCard.style.color = '#ffffff'; // Set text color to white
    countryCard.style.transition = 'transform 0.2s, box-shadow 0.2s';
    countryCard.onmouseover = () => {
        countryCard.style.transform = 'scale(1.02)';
        countryCard.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
    };
    countryCard.onmouseout = () => {
        countryCard.style.transform = 'scale(1)';
        countryCard.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    };

    const flag = country.flags ? country.flags.png : 'N/A';
    countryCard.innerHTML = `
        <img src="${flag}" alt="${country.name.common} Flag" style="width: 100%; height: auto; border-radius: 8px;">
        <h3 style="margin-top: 12px; color: #ffffff;">${country.name.common}</h3>
        <p style="color: #ffffff;"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p style="color: #ffffff;"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p style="color: #ffffff;"><strong>Region:</strong> ${country.region}</p>
    `;

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    weatherCard.style.flex = '1';
    weatherCard.style.border = '1px solid #e0e0e0';
    weatherCard.style.borderRadius = '12px';
    weatherCard.style.padding = '16px';
    weatherCard.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    weatherCard.style.backgroundColor = '#2596be';
    weatherCard.style.color = '#ffffff';
    weatherCard.style.display = 'grid';
    weatherCard.style.gridTemplateColumns = 'repeat(3, 1fr)';
    weatherCard.style.gridAutoRows = 'minmax(100px, auto)';
    weatherCard.style.gap = '10px';
    weatherCard.style.transition = 'transform 0.2s, box-shadow 0.2s';
    weatherCard.onmouseover = () => {
        weatherCard.style.transform = 'scale(1.02)';
        weatherCard.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
    };
    weatherCard.onmouseout = () => {
        weatherCard.style.transform = 'scale(1)';
        weatherCard.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    };

    const weatherDescription = weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : 'N/A';

    const weatherDetails = [
        { icon: '🌡️', label: 'Temperature', value: `${weatherData.main.temp}°C` },
        { icon: '💧', label: 'Humidity', value: `${weatherData.main.humidity}%` },
        { icon: '🌬️', label: 'Wind Speed', value: `${weatherData.wind.speed} m/s` },
        { icon: '☁️', label: 'Sky', value: weatherDescription },
        { icon: '🌧️', label: 'Rain', value: `${weatherData.rain ? weatherData.rain['1h'] || 'N/A' : 'N/A'} mm` },
        { icon: '🔆', label: 'Feels Like', value: `${weatherData.main.feels_like}°C` },
    ];

    weatherDetails.forEach(detail => {
        const detailCard = document.createElement('div');
        detailCard.style.border = '1px solid #e0e0e0';
        detailCard.style.borderRadius = '8px';
        detailCard.style.padding = '10px';
        detailCard.style.textAlign = 'center';
        detailCard.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
        detailCard.style.backgroundColor = '#ffffff';
        detailCard.style.color = '#333';
        detailCard.style.transition = 'transform 0.2s, box-shadow 0.2s';
        detailCard.onmouseover = () => {
            detailCard.style.transform = 'scale(1.05)';
            detailCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        };
        detailCard.onmouseout = () => {
            detailCard.style.transform = 'scale(1)';
            detailCard.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
        };
        detailCard.innerHTML = `
            <div style="font-size: 24px;">${detail.icon}</div>
            <p><strong>${detail.label}:</strong></p>
            <p>${detail.value}</p>
        `;
        weatherCard.appendChild(detailCard);
    });

    cardContainer.appendChild(countryCard);
    cardContainer.appendChild(weatherCard);
    resultsContainer.appendChild(cardContainer);
}

