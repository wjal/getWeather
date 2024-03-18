import Slider from "react-slick";
import SevenDayForecast from "../SevenDayForecast/index.js";
import { useState, useEffect } from "react";
import { weatherCode, weatherCodeDay, weatherCodeNight } from "../../weatherCodes.js";
import Hour from '../Hour/index.js'
import {useAtom} from 'jotai'
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  weatherDataAtom,}  from '../../store.js'
import './Hourly.css'

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
  
  
  const [weatherData, setWeatherData] = useAtom(weatherDataAtom);
  

    return (
      
     
      <Slider {...settings} className="slider">
        
        
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