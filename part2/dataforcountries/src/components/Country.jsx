import {useEffect, useState} from "react";
import WeatherInfo from "./WeatherInfo.jsx";
import './Country.css';

const Country = ({country}) => {
    const data = country[0];
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeatherForCapital = async () => {
            const API_KEY = import.meta.env.VITE_SOME_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const weather = await response.json();
            setWeatherData(weather);
        };

        if (data.capital[0]) {
            fetchWeatherForCapital();
        }
    }, [data]);
    return (
        <div>
            <h1>
                <img src={data.flags.png} alt={`${data.name.common}'s flag`} width='75' height='50'/>
                {data.name.common}
                <img src={data.flags.png} alt={`${data.name.common}'s flag`} width='75' height='50'/>
            </h1>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <div className={'country-info'}>
                    <p><strong>Capital:</strong> {data.capital[0]}</p>
                    <p><strong>Area:</strong> {data.area} km<sup>2</sup></p>
                    <div>
                        <strong>Languages:</strong>
                        <ul>
                            {Object.values(data.languages).map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {weatherData &&
                    <div style={{flex: 1}}>
                        <WeatherInfo weatherData={weatherData}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Country;