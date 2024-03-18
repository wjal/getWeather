import { useEffect, useState } from "react";
import LocationDetail from "../LocationDetail";
import LocationTime from "../LocationTime";
import Detail from "../Detail";
import './Location.css'

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
        const sunsetText = `${sunsetDate.getHours() % 12}:${sunsetDate.getMinutes() >= 10 ? sunsetDate.getMinutes() : '0' + sunsetDate.getMinutes()}` + ` ${sunsetDate.getHours() > 11 ? 'PM' : 'AM'}`;
        setSunset(sunsetText);
    }

    const  handleSetSunrise = () => {
        const sunriseTemp = new Date(props.sunrise).toLocaleString("en-US", {timeZone: props.timeZone})
        const sunriseStamp = Date.parse(sunriseTemp)
        const sunriseDate = new Date(sunriseStamp)
        const sunriseText = `${sunriseDate.getHours()}:${sunriseDate.getMinutes() >= 10 ? sunriseDate.getMinutes() : '0' + sunriseDate.getMinutes()}` + ` ${sunriseDate.getHours() > 11 ? 'PM' : 'AM'}`;;
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
    
        <div className="location-container" >
             <h3>Local Time: {currentTime}</h3>
            {
            /*<div class="flex-row location">
                <div className="location-detail flex-row">
                    <LocationTime title="Local Time" icon="detailIcons/on-time.png" detail={currentTime} />
                </div>
            </div>*/
}
           { //<div class="flex-row location">   
           }    
           <div className="location-row-container">
            <div className="location-row-today">
                <Detail title="Sunrise" icon="detailIcons/sunrise.png" detail={sunrise} />
                <Detail title="Sunset" icon="detailIcons/sunset-.png" detail={sunset} />
            </div>  
            <div className="location-row-today">
                <Detail title="Longitude" icon="detailIcons/longitude.png" detail={longitude} />
                <Detail title="Latitude" icon="detailIcons/latitude.png" detail={latitude} />
            </div> 
            </div>                       
                { //   </div>
           } 
            {/*<div class="flex-row location"> 
                <div className="location-detail flex-row">
                    <LocationDetail title="Latitude" detail={Math.round(latitude * 100) / 100}/>
                    <LocationDetail title="Longitude" detail={ Math.round(longitude * 100) / 100}/>
                </div>                
            </div>*/
            }
        </div>
    
    )            
}

export default Location;