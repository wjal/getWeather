import { useEffect, useState } from "react";
import { weatherCode, weatherCodeDay } from "../weatherCodes";

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
const SevenDayForecast = (props) => {
                
    const [weekday, setWeekDay] = useState(null);
    const [weather, setWeather] = useState('')

    
    

    useEffect (() => {

        //console.log(props.time)
        const timeTemp = new Date(props.time).toLocaleString("en-US", {timeZone: props.timeZone})
        console.log('Time', timeTemp)
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
        <div className="weekly-content">
            <p>{weekday}</p>
            <img 
                src={`https://github.com/Tomorrow-IO-API/tomorrow-weather-codes/blob/master/V2_icons/large/png/${props.weatherCodeMax}0_${weatherCodeDay[props.weatherCodeMax + '0'][1]}_large.png?raw=true`} 
                alt="nope" 
                //onError={handleImageError}
            />
            <p>{weather}</p>
            <p>High: {Math.round(props.max)} °C</p>
            <p>Low: {Math.round(props.min)} °C</p>
        </div>
    )            
}

export default SevenDayForecast;