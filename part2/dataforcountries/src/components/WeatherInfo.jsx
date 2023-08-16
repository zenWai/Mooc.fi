import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({weatherData}) => {
    if (!weatherData) return null;

    return (
        <div className="weather-info">
            <div className="weather-header">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
                <h2>{weatherData.weather[0].description}</h2>
            </div>

            <div className="weather-details">
                <p><strong>Temperature:</strong> {weatherData.main.temp}<sup>°C</sup></p>
                <p><strong>Feels Like:</strong> {weatherData.main.feels_like}<sup>°C</sup></p>
                <p><strong>Min Temperature:</strong> {weatherData.main.temp_min}<sup>°C</sup></p>
                <p><strong>Max Temperature:</strong> {weatherData.main.temp_max}<sup>°C</sup></p>
                <p><strong>Wind Speed:</strong> {weatherData.wind.speed}<sup>m/s</sup></p>
            </div>
        </div>
    );
}

export default WeatherInfo;