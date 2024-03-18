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
        const d = new Date(props.timeOfDay);
        const hour = d.getHours();
        switch(true) {
            case(hour >= 3 && hour < 12):
                setTime(periods[0]);
                break;
            case(hour >= 12 && hour < 17):
                setTime(periods[1]);                
                break;
            case(hour >= 17 && hour < 21):
                setTime(periods[2]);                
                break;
            case(hour >= 21 || hour < 3):
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