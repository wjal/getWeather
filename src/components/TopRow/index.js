import CurrentWeather from '../CurrentWeather/index.js'
import Location from '../Location/index.js'
import { useAtom } from 'jotai'
import {
    locationAtom, 
    countryAtom, 
    nameAtom,
    longitudeAtom,
    latitudeAtom,
    locationTimeAtom,
    timeZoneAtom,
    weatherDataAtom,}  from '../../store.js'
import './TopRow.css'

const TopRow = () => {

    const [location, setLocation] = useAtom(locationAtom)
    const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
    const [lat, setLat] = useAtom(latitudeAtom);
    const [lon, setLon] = useAtom(longitudeAtom);
    const [weatherData, setWeatherData] = useAtom(weatherDataAtom);
    const [name, setName] = useAtom(nameAtom);
    const [country, setCountry] = useAtom(countryAtom)
    const [timeZone, setTimeZone] = useAtom(timeZoneAtom);
    
    return (
    
        <div className='top-row-today'>
            <div className='column-n'>

            <CurrentWeather  
                    code={weatherData.timelines.minutely[0].values.weatherCode} 
                    max={weatherData.timelines.minutely[0].values.temperature} 
                    currentTime={locationTime} 
                    sunrise={weatherData.timelines.daily[0].values.sunriseTime}
                    sunset={weatherData.timelines.daily[0].values.sunsetTime} 
                    latitude={lon} 
                    longitude={lat} 
                    timeZone={timeZone}
                    temperature={weatherData.timelines.minutely[0].values.temperature}
                  />
            </div>
                  
          


          <div className="column column-n">
              <Location 
                currentTime={locationTime} 
                sunrise={weatherData.timelines.daily[0].values.sunriseTime} 
                sunset={weatherData.timelines.daily[0].values.sunsetTime} 
                latitude={lon} 
                longitude={lat} 
                timeZone={timeZone} 
              />
            </div>
          </div>
)}

export default TopRow;
