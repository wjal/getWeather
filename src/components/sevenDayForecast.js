import { useEffect, useState } from "react";

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

    useEffect (() => {
        const d = new Date(props.dayOfWeek);
        setWeekDay(weekdays[d.getDay()])
    })

    return (
        <div className="weekly-content">
            <p>{weekday}</p>
            <p>High: {Math.round(props.max)} C</p>
            <p>Low: {Math.round(props.min)} C</p>
        </div>
    )            
}

export default SevenDayForecast;