import './App.css';
import { useEffect, useState } from 'react';
import SevenDayForecast from './components/sevenDayForecast';
import TodayForecast from './components/todayForecast.js'
import Search from './components/search.js';
import CurrentWeather from './components/currentWeather.js';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleGetWeather = async (ourLocation) => {
    try {
      const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${ourLocation}&apikey=ycfuYvyGRdSxtw0wLHBcM7APcytH7mkD`
      const response = await fetch(apiUrl)
      const data = await response.json();
      // Assuming you want to store the weather data in state
      setWeatherData(data);
      // Handle the weather data as needed
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  const handleOnSearchChange = async (searchData) => {
    const [lon, lat] = searchData.value.split(" ");
    const location = `${lon}, ${lat}`;
    handleGetWeather(location);
  }

  return (
    <div className="App">
      <div className='search-container'>
        <Search onSearchChange={handleOnSearchChange}/>
      </div>
      <div className='weekly'>
            {weatherData && <CurrentWeather  max={weatherData.timelines.minutely[0].values.temperature}/>}
      </div>
      <h3>Today</h3>
      <div className='weekly'>
            {weatherData && weatherData.timelines.hourly.map((hour, i) => (i == 0 || i == 6 || i == 12 || i == 18) ? <TodayForecast timeOfDay={hour.time} max={hour.values.temperature}/> : '')}
      </div>
      <h3>This week</h3>
      <div className='weekly'>
            {weatherData && weatherData.timelines.daily.map(day => <SevenDayForecast dayOfWeek={day.time} max={day.values.temperatureMax}/>)}
      </div>
    </div>
  );
};

export default App;