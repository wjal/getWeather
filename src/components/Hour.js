import Slider from "react-slick";
import SevenDayForecast from "./sevenDayForecast";
import { useState, useEffect } from "react";
import { weatherCode, weatherCodeDay, weatherCodeNight } from "../weatherCodes";
import { TIME_ZONE_URL, timeZoneOptions } from "../api.js";
import {useAtom} from 'jotai';
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


const Hour = (props) => {

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

  
  
  const [weekday, setWeekDay] = useState(null);
  const [weather, setWeather] = useState('');




  const [imageLoaded, setImageLoaded] = useState(true);
  const [location, setLocation] = useAtom(locationAtom)
  const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
  const [weatherData, setWeatherData] = useAtom(weatherDataAtom);
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [dayNight, setDayNight] = useState();
  const [check1, setCheck1] = useState();
  const [dayOrNight, setDayOrNight]= useState();
  const [check2, setCheck2] = useState();
  const [conditions, setConditions] = useState();
  //const sunsetTemp = new Date(props.sunset).toLocaleString("en-US", {timeZone: props.timeZone})
  //const sunsetStamp = Date.parse(sunsetTemp)
  //const sunset = new Date(sunsetStamp)
  //const sunsetText = `${sunset.getHours()}:${sunset.getMinutes() >= 10 ? sunset.getMinutes() : '0' + sunset.getMinutes()}`;

  
  const daily = weatherData.timelines.daily.map((day, index) => {
        //need to convert this to local time
        const currentDate = new Date(day.time).toLocaleString("en-US", {timeZone: timeZone});
        const stamp = Date.parse(currentDate);
        
        return {
    
            date: new Date(stamp),
            sunrise: new Date(day.values.sunriseTime),
            sunset: new Date(day.values.sunsetTime),}

        }); 
//console.log(`Sunrise: `, daily[1].sunrise, `Sunset: `, daily[1].sunset)




const handleGetLocationTime = async (lon, lat) => {

    try {
	  const response = await fetch(`${TIME_ZONE_URL}/timezone?lon=${lon}&lat=${lat}&s=0&c=1}`, timeZoneOptions);
	  const result = await response.json();
      const timeZoneTemp = result.Zones[0].TimezoneId;
      setTimeZone(timeZoneTemp);
      const currentDate = new Date().toLocaleString("en-US", {timeZone: timeZoneTemp});
      const stamp = Date.parse(currentDate);
      setLocationTime(stamp);
      //console.log(`Current time in ${timeZone}: ${currentDate}`);
    } catch (error) {
	    console.error(error);
    } 
  }

  const handleSetHourData = (time) =>{
    const today = new Date(props.hourData.time).toLocaleString("en-US", {timeZone: timeZone});
    const stamp = Date.parse(today);
    const todayDate = new Date(stamp);
  }
  
    const today = new Date(props.hourData.time).toLocaleString("en-US", {timeZone: timeZone});
    const stamp = Date.parse(today);
    const todayDate = new Date(stamp);

    //days.time.getMonth
    //if(props.hourData.time.getDay() == weatherData.timelines.daily.getDaily())

    
    //const handleImageError = () => {
    //    setImageLoaded(false);
    //  };
   
    const  handleSetSunset = (day) => {
        const sunsetTemp = new Date(day.sunset).toLocaleString("en-US", {timeZone: props.timeZone})
        const sunsetStamp = Date.parse(sunsetTemp)
        const sunsetDate = new Date(sunsetStamp)
        const sunsetText = `${sunsetDate.getHours() % 12}:${sunsetDate.getMinutes() >= 10 ? sunsetDate.getMinutes() : '0' + sunsetDate.getMinutes()}` + ` ${sunsetDate.getHours() > 11 ? 'PM' : 'AM'}`;
        setSunset(sunsetText);
    }

    const  handleSetSunrise = (day) => {
        const sunriseTemp = new Date(day.sunrise).toLocaleString("en-US", {timeZone: props.timeZone})
        const sunriseStamp = Date.parse(sunriseTemp)
        const sunriseDate = new Date(sunriseStamp)
        const sunriseText = `${sunriseDate.getHours()}:${sunriseDate.getMinutes() >= 10 ? sunriseDate.getMinutes() : '0' + sunriseDate.getMinutes()}` + ` ${sunriseDate.getHours() > 11 ? 'PM' : 'AM'}`;;
        setSunrise(sunriseText);
    }

    
    const check = () => { 
            
     daily.map((day) => {
            ///console.log(`From daily: `, day.date.getDate())
            //console.log(`From TodayDate: `, todayDate.getDate())
            if(day.date.getDate() === todayDate.getDate()){
                //handleSetSunrise(day.sunrise);
                //handleSetSunset(day.sunset);
                const sunriseTemp = day.sunrise.toLocaleString("en-US", {timeZone: timeZone})


                const sunriseStamp = Date.parse(sunriseTemp)
                const sunriseDate = new Date(sunriseStamp)
                const sunriseText = `${sunriseDate.getHours()}:${sunriseDate.getMinutes() >= 10 ? sunriseDate.getMinutes() : '0' + sunriseDate.getMinutes()}` + ` ${sunriseDate.getHours() > 11 ? 'PM' : 'AM'}`;;
                setSunrise(sunriseText);

                const sunsetTemp = day.sunset.toLocaleString("en-US", {timeZone: timeZone})

                const sunsetStamp = Date.parse(sunsetTemp)
                const sunsetDate = new Date(sunsetStamp)
                const sunsetText = `${sunsetDate.getHours()}:${sunsetDate.getMinutes() >= 10 ? sunsetDate.getMinutes() : '0' + sunsetDate.getMinutes()}` + ` ${sunsetDate.getHours() > 11 ? 'PM' : 'AM'}`;;
                setSunset(sunsetText);
                
                const today = new Date(props.hourData.time).toLocaleString("en-US", {timeZone: timeZone});
                const stamp = Date.parse(today);
                const todayDate = new Date(stamp);
                
                
                const dayOrNight = (todayDate.getHours() > sunriseDate.getHours() && todayDate.getHours() < sunsetDate.getHours()) ? '0' : '1';
                
                setDayNight(dayOrNight);
                
                const checkOne = dayNight === '0' ? weatherCodeDay[`${props.hourData.values.weatherCode}` + '0'][1] : weatherCodeNight[`${props.hourData.values.weatherCode}` + '1'][1];
                setCheck1(checkOne)
                const checkTwo = weatherCode[`${props.hourData.values.weatherCode}`][1];
                setCheck2(checkTwo)
                const condis  = dayOrNight === '0' ? weatherCodeDay[`${props.hourData.values.weatherCode}` + '0'][0] : weatherCodeNight[`${props.hourData.values.weatherCode}` + '1'][0];
                setConditions(condis)
            }

        });
    }
  
    
      const handleImageError = () => {
        setImageLoaded(false);
        
      };
  
        useEffect(() => {
            check()
        },[])
    return (
      <div key={props.key}  className="slide">
       
    
        <p>{weekdays[todayDate.getDay()]}</p>
        <p>{ todayDate.getHours() === 0 ? 12 : todayDate.getHours() % 12} {todayDate.getHours() > 11 ? 'pm' : 'am'}</p>
        
       { conditions !== 'Cloudy' ? <img 
    src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.hourData.values.weatherCode}${dayNight}_${check1}_large.png?raw=true`} 
    alt={check1} 
    onError={handleImageError}
    className="big-icon"
/> : 
    <img src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.hourData.values.weatherCode}${0}_cloudy_large.png?raw=true`} 
    alt={check1} 
    onError={handleImageError}
    className="big-icon" />
    }
       <p>{conditions}</p>
        <p>{Math.round(props.hourData.values.temperature)} °C</p>
      </div>
       
    );
  };

  export default Hour;