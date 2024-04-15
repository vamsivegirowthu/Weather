import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header.jsx'
// import { SearchBar } from './Components/SearchBar.jsx'
import axios from 'axios';

var cities = ["Mumbai", "chennai", "Lucknow", "Viskhapatnam", "Kochi", "Kolkata", "Punjab", "Delhi", "Hyderabad", "Kakinada", "Vijayawada", "Kothapeta Godavari", "Ravulapalem Godavari"];

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=f65a10ab24ae4a8a828113421241404`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log('Error fetching data', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await Promise.all(
        cities.map(async (city) => {
          const weatherData = await fetchWeatherData(city);
          console.log(weatherData);
          return weatherData;
        }),
      )
        setData(fetchedData);
    };


      fetchData();

      return () => {
      }
    },[]);

    const filteredCities = cities.filter(city =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div className='bg-cont'>
        <Header />
        <input
         type='text'
         placeholder='Search for a city....'
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
       />
       <div>
        <div className='main-container'>
          {filteredCities.length == 0 ? <h1 style={{"color": "yellow"}}>Nothing found</h1> :

          (filteredCities.map((city, index) => (
            <div key={index} className='city-container'>
              <h3>{city.charAt(0).toUpperCase() + city.slice(1)}</h3>
              <div>
                <p>Temperature: {data[index]?.current.temp_c}℃</p>
                <p>Feels like : {data[index]?.current.feelslike_c}℃</p>
                <p>Summary: {data[index]?.current.condition.text}</p>
          
        </div>
       </div>)))}
       </div>  
       </div>
       </div>
)}
  // return (
  //     <div className='bgcontainer'>
  //     <Header/>
  //        {/* <SearchBar/> */}

  //       {/* const cities = ["Mumbai", "chennai", "Lucknow", "Viskhapatnam", "Kochi", "Kolkata", "Punjab", "Delhi", "Hyderabad", "Kakinada", "Vijayawada",]; */}
          
        
  //     </div>
  // )


export default App