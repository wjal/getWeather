import { useEffect, useState } from "react";

const Location = (props) => {
                
    const [currentTime, setCurrentTime] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [timeZone, setTimeZone] = useState(props.timeZone);




    const  handleSetSunset = () => {
        const sunsetTemp = new Date(props.sunset).toLocaleString("en-US", {timeZone: props.timeZone})
        const sunsetStamp = Date.parse(sunsetTemp)
        const sunsetDate = new Date(sunsetStamp)
        const sunsetText = `${sunsetDate.getHours()}:${sunsetDate.getMinutes() >= 10 ? sunsetDate.getMinutes() : '0' + sunsetDate.getMinutes()}`;
        setSunset(sunsetText);
    }

    const  handleSetSunrise = () => {
        const sunriseTemp = new Date(props.sunrise).toLocaleString("en-US", {timeZone: props.timeZone})
        const sunriseStamp = Date.parse(sunriseTemp)
        const sunriseDate = new Date(sunriseStamp)
        const sunriseText = `${sunriseDate.getHours()}:${sunriseDate.getMinutes() >= 10 ? sunriseDate.getMinutes() : '0' + sunriseDate.getMinutes()}`;
        setSunrise(sunriseText);
    }
    
    const  handleCurrentTime = () => {
        const currentTimeStamp = new Date(props.currentTime);
        const currentTimeText = `${currentTimeStamp.getHours() % 12 === 0 ? 12 : currentTimeStamp.getHours() % 12}:${currentTimeStamp.getMinutes() >= 10 ? currentTimeStamp.getMinutes() : '0' + currentTimeStamp.getMinutes()} ` + ` ${currentTimeStamp.getHours() > 11 ? 'PM' : 'AM'}`;
        setCurrentTime(currentTimeText);
    }

    useEffect(()=>{
        handleCurrentTime();
        handleSetSunrise();
        handleSetSunset();
        setTimeZone(props.timeZone);
        setLatitude(props.latitude);
        setLongitude(props.longitude)
    })
             
    


    return (
    
        <div className="daily-content location-container" >
            
            <div class="time flex-row location">
                <p>Current Time: {currentTime}</p>
                <p>Timezone: {timeZone}</p>
            </div>
            <div class="time flex-row location">       
                <div>
                    <p>{ sunrise } am</p>
                    <p>Sunrise</p>
                </div>                         
                <div>
                    <p>{ sunset } pm</p>
                    <p>Sunset</p>

                </div> 
            </div>
            <div class="time flex-row location">                 
                <div>
                    <p>{Math.round(latitude * 100) / 100}</p>
                    <p>Latitude</p>
                </div>                       
                <div>
                    <p>{ Math.round(longitude * 100) / 100}</p>
                    <p>Longitude</p>
                </div>
            </div>
        </div>
    
    )            
}

export default Location;