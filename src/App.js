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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hourly from './components/hourly.js'
import { useAtom } from 'jotai';
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  wetherDataAtom,}  from './store.js'



const App = () => {

  const [location, setLocation] = useAtom(locationAtom)
  const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
  const [lat, setLat] = useAtom(latitudeAtom);
  const [lon, setLon] = useAtom(longitudeAtom);
  const [weatherData, setWeatherData] = useAtom(wetherDataAtom);
  const [name, setName] = useAtom(nameAtom);
  const [country, setCountry] = useAtom(countryAtom)
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom);


  const settings = {
  dots: false,
  infinite: false, // Enable infinite loop
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0, // Start from the first item in the array
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};



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

  

  return (
    
    <div className="App">
      <NavBar/>
      
      
      <div className='wrapper'>
        <div className='daily-wrap'>
          <div className='top-row-today'>
            <div className="column right-column">
              { weatherData &&  <>
                <h2 className="title daily-content">{name}, {country}</h2>
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
              
                                  
              </>
            }
          </div>

          <div class="bar"></div>

          <div className="column right-column">
            <div className='search-container'>
              {//<Search onSearchChange={handleOnSearchChange}/>
              }
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
          { weatherData &&             
          <div className="bottom-row-today">
            <Detail detail={weatherData.timelines.minutely[0].values.precipitationProbability} title="Precipitation" character="%" icon="detailIcons/precipitation.png"/>
            <div class="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.humidity} title="Humidity" character="%" icon="detailIcons/humidity.png"/>
            <div class="bar"></div>
            <Detail detail={(weatherData.timelines.minutely[0].values.pressureSurfaceLevel / 10).toFixed(2)} title="Pressure" character="kPa" icon="detailIcons/barometer.png"/>
            <div class="bar"></div>
            <Detail detail={(weatherData.timelines.minutely[0].values.cloudCeiling * 1600).toFixed(0)} title="Ceiling" character="m" icon="detailIcons/ceiling.png"/>
            <div class="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.cloudCover} title="Cloud Cover" character="%" icon="detailIcons/cloudy-day.png"/>
            <div class="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.windSpeed} title='Wind Speed' character="km/h" icon="detailIcons/wind.png"/>  
          </div>}
        </div>
        <div className='weekly-wrap'>
          <h3 className='detail-content'>5 day forecast</h3>
            <div className="flex-row wide detail-content">
            { weatherData  && 
              //<Slider >
              <Slider {...settings} className="flex-row wide detail-content slider">
                {weatherData.timelines.hourly.map((hourData, index) => (
                <div key={index}  className="slide">
                  <p>{hourData.time}</p>
                  <p>{hourData.values.temperature}</p>
                </div>
              ))}
            </Slider>
               // {weatherData.timelines.hourly.map((day, key) => <SevenDayForecast key={key}time={day.time} max={day.values.temperatureMax} min={day.values.temperatureMin} weatherCodeMax={day.values.weatherCode} />)}
              //</Slider>
              //<Slider>
              //{weatherData.timelines.hourly.map((hourData, index) => (
              //  <>
               //   {console.log(hourData.time, hourData.values.temperature)}
      
               //</>   <p key={index} data={hourData.values.temperature} > {hourData.time}</p>
      
               // </>
                 
              //</div>))}
           // </Slider>
            }
            </div>
        </div>
        <div className='weekly-wrap'>
          <h3 className='detail-content'>5 day forecast</h3>
            <div className="flex-row wide detail-content">
            { weatherData && weatherData.timelines.daily.map(day => <SevenDayForecast time={day.time} max={day.values.temperatureMax} min={day.values.temperatureMin} weatherCodeMax={day.values.weatherCodeMax} />)
            }
            </div>
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