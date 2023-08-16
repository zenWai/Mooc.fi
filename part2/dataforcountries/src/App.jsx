import './App.css'
import {useEffect, useState} from 'react';
import Country from "./components/Country.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            });
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length === 0) {
            setFilteredCountries([]);
        } else {
            const searchResults = countries.filter(country =>
                country.name.common.toLowerCase().includes(value.toLowerCase())
            );

            if (searchResults.length > 10) {
                setMessage('Too many results...');
                setFilteredCountries([]);
            } else {
                setMessage('');
                setFilteredCountries(searchResults);
            }
        }
    };

    const handleShow = (countryName) => {
        setInputValue(countryName);
        const searchResults = countries.filter(country =>
            country.name.common.toLowerCase() === countryName.toLowerCase()
        );
        setFilteredCountries(searchResults);
    }
    return (
        <div>
            <input
                className={'input'}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Start typing a country name..."
            />
            <div>
                {message && <div>{message}</div>}
                {filteredCountries.length === 1 ? (
                    <Country country={filteredCountries}/>
                ) : (
                    filteredCountries.map((country, index) => (
                        <div key={index}>
                            {country.name.common}
                            <button onClick={() => handleShow(country.name.common)}>Show</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App
