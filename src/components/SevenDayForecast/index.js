/*import { useEffect, useState } from "react";
import { weatherCode, weatherCodeDay } from "../../weatherCodes";
import './SevenDayForecast.css'
const weekdays = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thurs',
    'Fri',
    'Sat',
]
const SevenDayForecast = (props) => {
                
    const [weekday, setWeekDay] = useState(null);
    const [weather, setWeather] = useState('')

    
    

    useEffect (() => {

        //console.log(props.time)
        const timeTemp = new Date(props.time).toLocaleString("en-US", {timeZone: props.timeZone})
        const timeStamp = Date.parse(timeTemp)
        const time = new Date(timeStamp)
        
        //console.log(`Day: `, time
        //)
        setWeekDay(weekdays[time.getDay()])

        const check1 = weatherCodeDay[`${props.weatherCodeMax}` + '0'][1];
        const conditions = weatherCode[`${props.weatherCodeMax}`][0];
        setWeather(conditions);
    },[])

    return (
        <div className="weekly-content" key={props.index}>
           <p>{weekday}</p>
             <img 
                src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.weatherCodeMax}0_${weatherCodeDay[props.weatherCodeMax + '0'][1]}_large.png?raw=true`} 
                alt="nope" 
                className="seven-day-forecast-icon"
                //onError={handleImageError}
            />
            <p>{weather}</p>
            <p>High: {Math.round(props.max)} °C</p>
            <p>Low: {Math.round(props.min)} °C</p>
        </div>
    
    )            
}

export default SevenDayForecast;

*/


import Slider from "react-slick";
import { useState, useEffect } from "react";
import { weatherCode, weatherCodeDay, weatherCodeNight } from "../../weatherCodes.js";
import { TIME_ZONE_URL, timeZoneOptions } from "../../api.js";
import {useAtom} from 'jotai';
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  weatherDataAtom,}  from '../../store.js'
import './SevenDayForecast.css'
        
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

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Satday',
]



const SevenDayForecast = (props) => {
                
    const [weekday, setWeekDay] = useState(null);
    const [weather, setWeather] = useState('')

        useEffect (() => {

            //console.log(props.time)
            const timeTemp = new Date(props.time).toLocaleString("en-US", {timeZone: props.timeZone})
            const timeStamp = Date.parse(timeTemp)
            const time = new Date(timeStamp)
            
            //console.log(`Day: `, time
            //)
            setWeekDay(weekdays[time.getDay()])
    
            const check1 = weatherCodeDay[`${props.weatherCodeMax}` + '0'][1];
            const conditions = weatherCode[`${props.weatherCodeMax}`][0];
            setWeather(conditions);
        },[])
    


    
    return (
      <div key={props.key}  className="slide"> 
      <p>{weekday}</p>     
       <img 
                src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.weatherCodeMax}0_${weatherCodeDay[props.weatherCodeMax + '0'][1]}_large.png?raw=true`} 
                alt="nope" 
                //onError={handleImageError}
            />

       <p>High: {Math.round(props.max)} °C</p>
       <p>Low: {Math.round(props.min)} °C</p>
   </div>
       
    );
  };


export default SevenDayForecast;









