import { useEffect, useState } from "react";


const CurrentWeather = (props) => {
                
    const [time, setTime] = useState('');
    

    useEffect (() => {
       
    })

    return (
        <div>
            <p>Current Weather</p>
            <p>{props.max} C</p>
        </div>
    )            
}

export default CurrentWeather;