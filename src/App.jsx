import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import "../src/Components/Styles.css";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=7b2a6f68c694435caa980824242901`
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching data', error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.trim() !== '') {
        const newData = await fetchWeatherData(inputValue.trim());
        if (newData) {
          setData([newData]);
          setError('');
        } else {
          setError('City not found');
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [inputValue]);

  const handleSearch = async () => {
    if (inputValue.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    const city = inputValue.trim().toLowerCase();
    setInputValue(city);
  };

  return (
    <div className='bg-cont'>
      <Header />
      <input
        type="text"
        placeholder="Search for a city..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <div className='main-container'>
          {data.map((cityData, index) => (
            <div key={index} className='city-container'>
              <h3>{cityData.location.name}</h3>
              <div>
                <p>Temperature: {cityData.current.temp_c}°C</p>
                <p>Feels like: {cityData.current.feelslike_c}°C</p>
                <p>Summary: {cityData.current.condition.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
