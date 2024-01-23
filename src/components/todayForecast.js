import { useEffect, useState } from "react";

const periods = [
    'Morning',
    'Afternoon',
    'Evening',
    'Night',
]

const TodayForecast = (props) => {
                
    const [time, setTime] = useState('');
    

    useEffect (() => {
        
        const timeTemp = new Date(props.timeOfDay).toLocaleString("en-US", {timeZone: props.timeZone})
        const timeStamp = Date.parse(timeTemp)
        const timeOfDay = new Date(timeStamp)

        

        switch(true) {
            case(timeOfDay.getHours() >= 4 && timeOfDay.getHours() < 12):
                setTime(periods[0]);
                break;
            case(timeOfDay.getHours() >= 12 && timeOfDay.getHours() < 17):
                setTime(periods[1]);                
                break;
            case(timeOfDay.getHours() >= 17 && timeOfDay.getHours() < 21):
                setTime(periods[2]);                
                break;
            case(timeOfDay.getHours() >= 21 || timeOfDay.getHours() <= 3):
                setTime(periods[3])
                break;
            default:
                break;
        }
    })

    return (
        <div className="weekly-content">
            <p>{time}</p>
            <p>{Math.round(props.max)} C</p>
        </div>
    )            
}

export default TodayForecast;