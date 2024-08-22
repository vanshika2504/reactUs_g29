import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Currrent from './components/Currrent';
import Highlight from './components/Highlight';
import Map from './components/Map';
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=";
const apiKey = "88ea22abd5c84c0b807152931240704";
function App() {
    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (city.trim() !== '') {
            fetchWeatherData(city.trim());
        }
    }, [city]);

    const fetchWeatherData = async (city) => {
        try {
            setLoading(true);
            // const response = await fetch(apiUrl + apiKey + "&q=" + city +"&days=6");
            const response = await fetch(`${apiUrl}${apiKey}&q=${city}&days=6`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            
            console.log(data)
            setWeatherData(data);

            setError(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
   
    const handleSearch = (searchQuery) => {
        if (searchQuery.trim() !== '') {
            setCity(searchQuery);
        }
    };
    console.log(city)
    return (
    <>
    <div className="fluid-container">
        <Header onSearch={handleSearch} loading={loading} />
        {error && <div>Error fetching weather data</div>}
        <div className="fluid-container main-content" id="main-content">
            <div className="fluid-container ">
                <div className="row">
                                <Map />
                    <div className="col-lg-3">
                        <Currrent weatherData={weatherData} />
                        <h3 className="heading" >5 Days Forecast</h3>
                        <div className="upperleft m-4 p-4 mb-5 col-lg" id="Multi-forcast">
                        {weatherData.forecast && weatherData.forecast.forecastday.map((forecast, index) => (
                                    <div key={index}>
                                        <p>{forecast.date}</p>
                                        {/* <p>{forecast.day.condition.text}</p> */}
                                        <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
                                        {/* Add more details as needed */}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="col-lg-9 containers">
                    
                    
                    
                        < Highlight weatherData={weatherData} />    
                    </div>   
                </div>
            </div>
            <h3 className="heading2">Today At</h3>
            <div className="fluid-container flex color1 contain-hourly-data" id="hourly_display">
            {weatherData.forecast && weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                        <div key={index} className="hourly-item">
                            <img className="icon" src={hour.condition.icon} alt={hour.condition.text} />
                            <p className="temp">{hour.temp_c} °c</p>
                            <p className="time">{hour.time}</p>
                            <p className="rain">Chance of Rain : {hour.chance_of_rain}</p>
                            <p className="snow">Chance of Snow : {hour.chance_of_snow}</p>
                            <p className="condition">{hour.condition.text}</p>
                        </div>
                    ))}
            </div>
        </div>
    </div>
    </>
    
  );
}

export default App;
