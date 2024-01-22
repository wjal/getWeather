import { useEffect, useState } from "react";
import  { weatherCodeDay, weatherCodeFullDay, weatherCodeNight, weatherCode} from "../weatherCodes";
import { timeZoneOptions, TIME_ZONE_URL } from "../api";


const CurrentWeather = (props) => {
                
    const [imageLoaded, setImageLoaded] = useState(true);

    
    const sunsetTemp = new Date(props.sunset).toLocaleString("en-US", {timeZone: props.timeZone})
    const sunsetStamp = Date.parse(sunsetTemp)
    const sunset = new Date(sunsetStamp)
    const sunsetText = `${sunset.getHours()}:${sunset.getMinutes() >= 10 ? sunset.getMinutes() : '0' + sunset.getMinutes()}`;
    //const sunsetText = `${sunsetStamp.getHours()}:${sunsetStamp.getMinutes()}`;

    const sunriseTemp = new Date(props.sunrise).toLocaleString("en-US", {timeZone: props.timeZone})
    const sunriseStamp = Date.parse(sunriseTemp)
    const sunrise = new Date(sunriseStamp)
    
    const sunriseText = `${sunrise.getHours()}:${sunrise.getMinutes() >= 10 ? sunrise.getMinutes(): '0' + sunrise.getMinutes()}`;    

    const currentTimeStamp = new Date(props.currentTime);
    const currentTimeText = `${currentTimeStamp.getHours()}:${currentTimeStamp.getMinutes() >= 10 ? currentTimeStamp.getMinutes() : '0' + currentTimeStamp.getMinutes()}`;
    
    const dayOrNight = (currentTimeStamp > sunriseStamp && currentTimeStamp < sunsetStamp) ? '0' : '1';

    console.log((currentTimeStamp > sunriseStamp && currentTimeStamp < sunsetStamp) ? 'day' : 'night')
    const check1 = dayOrNight === '0' ? weatherCodeDay[`${props.code}` + '0'][1] : weatherCodeNight[`${props.code}` + '1'][1];

 
    const handleImageError = () => {
        setImageLoaded(false);
      };
   
       
    useEffect (() => {
        const letsSee = async () => {
        console.log(`here`)
        }
        letsSee();
    },[])

    return (
        <div className="weekly-content">
            <p>Current Weather</p>            
             { imageLoaded ? 
                            <img 
                                src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.code}${dayOrNight}_${check1}_large.png?raw=true`} 
                                alt="nope" 
                                onError={handleImageError}
                            /> 
                                : 
                            <img 
                                src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.code}${dayOrNight}_${weatherCodeDay[`${props.code}` + '0'][1]}_large.png?raw=true`} 
                                alt="nope" 
                            /> 
            }
            <p>Time: {currentTimeText}</p>  
            <p>Sunrise: {sunriseText}</p>  
            <p>Sunset: {sunsetText}</p>  
        </div>
    )            
}

export default CurrentWeather;