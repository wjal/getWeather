import { useEffect, useState } from "react";
import { useAtom } from 'jotai'
import { nameAtom, countryAtom } from '../store.js'
import  { weatherCodeDay, weatherCodeFullDay, weatherCodeNight, weatherCode} from "../weatherCodes";
import { timeZoneOptions, TIME_ZONE_URL } from "../api";


const CurrentWeather = (props) => {
                
    const [imageLoaded, setImageLoaded] = useState(true);
    const [name, setName] = useAtom(nameAtom);
    const [country, setCountry] = useAtom(countryAtom)

    
    const sunsetTemp = new Date(props.sunset).toLocaleString("en-US", {timeZone: props.timeZone})
    const sunsetStamp = Date.parse(sunsetTemp)
    const sunset = new Date(sunsetStamp)
    const sunsetText = `${sunset.getHours()}:${sunset.getMinutes() >= 10 ? sunset.getMinutes() : '0' + sunset.getMinutes()}`;

    const sunriseTemp = new Date(props.sunrise).toLocaleString("en-US", {timeZone: props.timeZone})
    const sunriseStamp = Date.parse(sunriseTemp)
    const sunrise = new Date(sunriseStamp)
    const sunriseText = `${sunrise.getHours()}:${sunrise.getMinutes() >= 10 ? sunrise.getMinutes(): '0' + sunrise.getMinutes()}`;    

    const currentTimeStamp = new Date(props.currentTime);
    const currentTimeText = `${currentTimeStamp.getHours()}:${currentTimeStamp.getMinutes() >= 10 ? currentTimeStamp.getMinutes() : '0' + currentTimeStamp.getMinutes()}`;
    
    const dayOrNight = (currentTimeStamp > sunriseStamp && currentTimeStamp < sunsetStamp) ? '0' : '1';

    const check1 = dayOrNight === '0' ? weatherCodeDay[`${props.code}` + '0'][1] : weatherCodeNight[`${props.code}` + '1'][1];
    const check2 = weatherCode[`${props.code}`][1];
    const conditions  = dayOrNight === '0' ? weatherCodeDay[`${props.code}` + '0'][0] : weatherCodeNight[`${props.code}` + '1'][0];

 
    const handleImageError = () => {
        setImageLoaded(false);
      };
   
       
    useEffect (() => {
       
    },[])

    return (
        
        <div className="column right-column">
        <h2 className="title daily-content">{name}, {country}</h2>  
        <div className="daily-content wide">
            <div className="flex-row big-icon-container">
            <div className="flex-row temperature"><h2>{Math.round(props.temperature)}</h2><div className="flex-column"><span className="degrees">°C</span><span></span></div></div>
                    { imageLoaded ? 
                        <img 
                            src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.code}${dayOrNight}_${check1}_large@2x.png?raw=true`} 
                            alt={check1} 
                            onError={handleImageError}
                            className="big-icon"
                        /> 
                        : 
                        <img 
                            src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.code}0_${check2}_large@2x.png?raw=true`} 
                            alt="nope"
                            className="big-icon" 
                        /> 
                    }
                    </div >
                    <div className="conditions">
                    <p >{conditions}</p>
                    </div>
                    </div>
        </ div> 
    )
                 

}

export default CurrentWeather;