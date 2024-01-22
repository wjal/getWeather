import './App.css';
import { useEffect, useState } from 'react';
import SevenDayForecast from './components/sevenDayForecast';
import TodayForecast from './components/todayForecast.js'
import Search from './components/search.js';
import CurrentWeather from './components/currentWeather.js';
import { timeZoneOptions, TIME_ZONE_URL } from './api.js';

const App = () => {
  const [location, setLocation] = useState('');
  const [locationTime, setLocationTime] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('')
  const [countryCode, setCountryCode] = useState('');
  const [timeZone, setTimeZone] = useState();


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleGetLocationTime = async (lon, lat) => {

try {
	const response = await fetch(`${TIME_ZONE_URL}/timezone?lon=${lon}&lat=${lat}&s=0&c=1}`, timeZoneOptions);
	const result = await response.json();
	console.log(result);

  const timeZoneTemp = result.Zones[0].TimezoneId
  setTimeZone(timeZoneTemp)
  const currentDate = new Date().toLocaleString("en-US", {timeZone: timeZoneTemp})
  const stamp = Date.parse(currentDate)
  
  //const check = new Date(stamp).toDateString()
  //const check2 = new Date(stamp).toTimeString()
  console.log('set location time', stamp);
  setLocationTime(stamp)
 

  console.log(`Current time in ${timeZone}: ${currentDate}`);
	
} catch (error) {
	console.error(error);
}
   
   // setLocationTime(timestamp);
  }

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
    const [lati, long, name, country] = searchData.value.split(",");
    setName(name);
    setCountry(country);
    setCountryCode(countryCode);
    setLon(long);
    setLat(lati);
    const location = `${lati}, ${long}`;
    handleGetWeather(location);
    handleGetLocationTime(long, lati);
  }

  return (
    <div className="App">
      <div className='search-container'>
        <Search onSearchChange={handleOnSearchChange}/>
      </div>
      <div className='weekly-wrap'>
            {weatherData && <CurrentWeather  code={weatherData.timelines.minutely[0].values.weatherCode} max={weatherData.timelines.minutely[0].values.temperature} currentTime={locationTime} sunrise={weatherData.timelines.daily[0].values.sunriseTime} sunset={weatherData.timelines.daily[0].values.sunsetTime} latitude={lon} longitude={lat} timeZone={timeZone}/>}
      </div>
      <h3>Today</h3>
      <div className='weekly-wrap'>
            {weatherData && weatherData.timelines.hourly.map((hour, i) => (i == 0 || i == 3 || i == 9 || i == 15) ? <TodayForecast timeOfDay={hour.time} max={hour.values.temperature}/> : '')}
      </div>
      <h3>This week</h3>
      <div className='weekly-wrap'>
            {weatherData && weatherData.timelines.daily.map(day => <SevenDayForecast dayOfWeek={day.time} max={day.values.temperatureMax} min={day.values.temperatureMin}/>)}
      </div>
    </div>
  );
};

export default App;