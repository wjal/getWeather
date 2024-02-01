import Search from "./search";
import { useAtom } from 'jotai';
import {
  locationAtom, 
  countryAtom, 
  nameAtom,
  longitudeAtom,
  latitudeAtom,
  locationTimeAtom,
  timeZoneAtom,
  wetherDataAtom,}  from '../store.js'
import { timeZoneOptions, TIME_ZONE_URL } from "../api.js";

const NavBar = () => {

const [location, setLocation] = useAtom(locationAtom)
  const [locationTime, setLocationTime] = useAtom(locationTimeAtom);
  const [lat, setLat] = useAtom(latitudeAtom);
  const [lon, setLon] = useAtom(longitudeAtom);
  const [weatherData, setWeatherData] = useAtom(wetherDataAtom);
  const [name, setName] = useAtom(nameAtom);
  const [country, setCountry] = useAtom(countryAtom)
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom);



  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleGetLocationTime = async (lon, lat) => {

    try {
	    const response = await fetch(`${TIME_ZONE_URL}/timezone?lon=${lon}&lat=${lat}&s=0&c=1}`, timeZoneOptions);
	    const result = await response.json();
	    console.log(result);
      const timeZoneTemp = result.Zones[0].TimezoneId
      setTimeZone(timeZoneTemp)
      console.log('TIMEZONE', timeZoneTemp);
      const currentDate = new Date().toLocaleString("en-US", {timeZone: timeZoneTemp})
      const stamp = Date.parse(currentDate)
      setLocationTime(stamp)
      //console.log(`Current time in ${timeZone}: ${currentDate}`);
    } catch (error) {
	    console.error(error);
    } 
  }

  const handleGetWeather = async (ourLocation) => {
    try {
      const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${ourLocation}&apikey=ycfuYvyGRdSxtw0wLHBcM7APcytH7mkD`
      const response = await fetch(apiUrl)
      const data = await response.json();
      // Assuming you want to store the weather data in state
      setWeatherData(data);
      // Handle the weather data as needed
      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }


    const handleOnSearchChange = async (searchData) => {
        const [lati, long, name, country] = searchData.value.split(",");
        setName(name);
        setCountry(country);
        //setCountryCode(countryCode);
        setLon(long);
        setLat(lati);
        const location = `${lati}, ${long}`;
        handleGetWeather(location);
        handleGetLocationTime(long, lati);
      }

    return(
        <div className="navbar">
            <h1 >getWeather</h1>
            <div className='search-container'>
              <Search onSearchChange={handleOnSearchChange}/>
            </div>
        </div>
    )
}

export default NavBar;