import './App.css';
import { useEffect, useState } from 'react';
import SevenDayForecast from './components/sevenDayForecast';
import TodayForecast from './components/todayForecast.js'
import Location from './components/location.js';
import Search from './components/search.js';
import Detail from './components/detail.js';
import CurrentWeather from './components/currentWeather.js';
import { timeZoneOptions, TIME_ZONE_URL } from './api.js';
import Slider from 'react-slick';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NavBar from './components/navbar.js';
import BottomRow from './components/BottomRow.js'
import TopRow from './components/TopRow.js'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hourly from './components/hourly.js'
import getUserCoordinatesimport, { getUserCoordinates } from './store.js'
import { useAtom } from 'jotai';
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  weatherDataAtom,}  from './store.js'



const App = () => {

  const [location, setLocation] = useAtom(locationAtom)
  const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
  const [lat, setLat] = useAtom(latitudeAtom);
  const [lon, setLon] = useAtom(longitudeAtom);
  const [weatherData, setWeatherData] = useAtom(weatherDataAtom);
  const [name, setName] = useAtom(nameAtom);
  const [country, setCountry] = useAtom(countryAtom)
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom);

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
const handleCoords =  async () => {
  await getUserCoordinates(setLat, setLon);
  console.log(`here`, lat, lon)
}

  useEffect(() => {
   handleCoords()
  }, [])
  

  return (
    
    <div className="App">


      <NavBar/>



      {!weatherData && 
      <div className='no-location-wrapper'>
        <div className='no-location-wrap'>
          <h1 className="no-location-content">We were unable to find your location.  Try using the search bar!</h1>
        </div>
      </div>}
      <div className='wrapper'>

      { weatherData &&
      <>
        <div className='daily-wrap'>
        
          <TopRow />
          

          <BottomRow weatherData={weatherData}/>  
          
        </div>
        




        <div className='weekly-wrap'>
          <h3 className='detail-content'>Hourly forecast</h3>
            <div className="flex-row wide detail-content">
                <Hourly  weatherData={weatherData}/>
            </div>
        </div>





        <div className='weekly-wrap'>
          <h3 className='detail-content'>This Week</h3>
            <div className="flex-row wide detail-content">
            { weatherData.timelines.daily.map((day, index) => <SevenDayForecast key={index} time={day.time} max={day.values.temperatureMax} min={day.values.temperatureMin} weatherCodeMax={day.values.weatherCodeMax} />)
}
            </div>
        </div>
        </>
        
}
    </div>
</div>

           
   
  );
};

export default App;