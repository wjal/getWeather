import './App.css';
import { useEffect, useState } from 'react';
import SevenDayForecast from './components/sevenDayForecast';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleGetWeather = async () => {
    try {
     

      
      const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=ycfuYvyGRdSxtw0wLHBcM7APcytH7mkD`;
      //https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=ycfuYvyGRdSxtw0wLHBcM7APcytH7mkD'

      const response = await fetch(apiUrl);
      const data = await response.json();

      // Assuming you want to store the weather data in state
      setWeatherData(data);

      // Handle the weather data as needed
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  return (
    <div className="App">
      <h1>Weather App</h1>
      <form>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location"
          />
        </label>
        <button type="button" onClick={handleGetWeather}>
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather Data:</h2>
          <pre>Current Temperature: {JSON.stringify(weatherData.timelines.minutely[0].values.temperature)} C </pre>
          
          <div className='weekly'>
            { weatherData.timelines.daily.map((day)=> <SevenDayForecast dayOfWeek={day.time} max={day.values.temperatureMax}/>)}
          </ div>
        </div>
      )}
    </div>
  );
};

export default App;