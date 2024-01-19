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
        <div>
            <p>{weekday}</p>
            <p>{props.max} C</p>
        </div>
    )            
}

export default SevenDayForecast;