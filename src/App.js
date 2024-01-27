import './App.css';
import { useEffect, useState } from 'react';
import SevenDayForecast from './components/sevenDayForecast';
import TodayForecast from './components/todayForecast.js'
import Location from './components/location.js';
import Search from './components/search.js';
import Detail from './components/detail.js';
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
  console.log('TIMEZONE', timeZoneTemp);
  const currentDate = new Date().toLocaleString("en-US", {timeZone: timeZoneTemp})
  const stamp = Date.parse(currentDate)
  setLocationTime(stamp)
  //console.log(`Current time in ${timeZone}: ${currentDate}`);
} catch (error) {
	console.error(error);
}
   
   
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
    //setCountryCode(countryCode);
    setLon(long);
    setLat(lati);
    const location = `${lati}, ${long}`;
    handleGetWeather(location);
    handleGetLocationTime(long, lati);
  }

  useEffect(() => {
   
  })

  return (
    <div className="App">
      <div className='wrapper'>
        <div className='daily-wrap'>
          <div className='top-row-today'>
            <div className="column right-column">
              { weatherData &&  <>
                                 

                                 
                                  <h2 className="title daily-content">{name}, {country}</h2>
                                  
                                  <div className='wide'>
                                    <CurrentWeather  
                                      code={weatherData.timelines.minutely[0].values.weatherCode} 
                                      max={weatherData.timelines.minutely[0].values.temperature} 
                                      currentTime={locationTime} 
                                      sunrise={weatherData.timelines.daily[0].values.sunriseTime} 
                                      sunset={weatherData.timelines.daily[0].values.sunsetTime} 
                                      latitude={lon} 
                                      longitude={lat} 
                                      timeZone={timeZone}
                                      temperature={weatherData.timelines.minutely[0].values.temperature}
                                    />
              
                                  </div>
                                  
                  </>
                }
                
            </div>

            <div class="bar"></div>

            <div className="column right-column">
              <div className='search-container'>
                <Search onSearchChange={handleOnSearchChange}/>
              </div>
                { weatherData &&
                  <Location 
                    currentTime={locationTime} 
                    sunrise={weatherData.timelines.daily[0].values.sunriseTime} 
                    sunset={weatherData.timelines.daily[0].values.sunsetTime} 
                    latitude={lon} 
                    longitude={lat} 
                    timeZone={timeZone} 
                  />
                }
            </div>
            </div>
            <div className="bottom-row-today">
              { weatherData &&             <div className="bottom-row-today">

              <Detail detail={weatherData.timelines.minutely[0].values.precipitationProbability} title="Precipitation %"/>
              <Detail detail={weatherData.timelines.minutely[0].values.humidity} title="humidity"/>
              <Detail detail={weatherData.timelines.minutely[0].values.pressureSurfaceLevel} title="pressure"/>
              <Detail detail={weatherData.timelines.minutely[0].values.cloudCeiling} title="ceiling"/>
              <Detail detail={weatherData.timelines.minutely[0].values.cloudCover} title="cloud cover"/>
              <Detail detail={weatherData.timelines.minutely[0].values.windSpeed} title='wind speed'/>
              </div>}
            </div>
      </div>
      <div className='daily-wrap'>
        <h3>5 day forecast</h3>
      </div>
  </div>
 
 

    



      {//<div className='weekly-wrap'>
            //{/*weatherData && weatherData.timelines.hourly.map((hour, i) => (i == 0 || i == 3 || i == 9 || i == 15) ? <TodayForecast timeOfDay={hour.time} max={hour.values.temperature}/> : '')*/}
      //</div>
      }




     
            {//weatherData && weatherData.timelines.daily.map(day => <SevenDayForecast time={day.time} max={day.values.temperatureMax} min={day.values.temperatureMin} weatherCodeMax={day.values.weatherCodeMax} />)
            }
</div>
             
   
  );
};

export default App;