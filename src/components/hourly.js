import Slider from "react-slick";
import SevenDayForecast from "./sevenDayForecast";
import { useState, useEffect } from "react";
import { weatherCode, weatherCodeDay, weatherCodeNight } from "../weatherCodes";
import Hour from './Hour.js'
import {useAtom} from 'jotai'
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  weatherDataAtom,}  from '../store.js'


const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
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

const Hourly = () => {
  
  
  const [weekday, setWeekDay] = useState(null);
  const [weather, setWeather] = useState('');




  const [imageLoaded, setImageLoaded] = useState(true);
  const [location, setLocation] = useAtom(locationAtom)
  const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
  const [lat, setLat] = useAtom(latitudeAtom);
  const [lon, setLon] = useAtom(longitudeAtom);
  const [weatherData, setWeatherData] = useAtom(weatherDataAtom);
  const [name, setName] = useAtom(nameAtom);
  const [country, setCountry] = useAtom(countryAtom)
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom);

    
  

  
    //const handleImageError = () => {
       // setImageLoaded(false);
     // };






/*


    useEffect (() => {
      //console.log(props.time)
      const timeTemp = new Date(hourlyData.timelines.hourly.time).toLocaleString("en-US", {timeZone: hourlyData.timelines.daily.timeZone})
      console.log('Time', timeTemp)
      const timeStamp = Date.parse(timeTemp)
      const time = new Date(timeStamp)
      
      //console.log(`Day: `, time
      //)
      setWeekDay(weekdays[time.getDay()])

      const check1 = weatherCodeDay[`${hourlyData.timelines.hourly.weatherCode}` + '0'][1];
      const conditions = weatherCode[`${hourlyData.timelines.hourly.weatherCode}`][0];
      setWeather(conditions);
  },[])*/

    return (
      
     
      <Slider {...settings} className="flex-row wide detail-content slider">
        
        
      { weatherData.timelines.hourly.map((hourData, index) => (
        /*
      <div key={index}  className="slide">
        <p>{hourData.time}</p>
        <p>{hourData.values.temperature}</p>
      </div>*/
      <Hour  hourData={hourData} key={index}/>
      ))}
      
  </Slider>
  
    );
  };

  export default Hourly;