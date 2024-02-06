import { atom } from 'jotai'
import { useAtom } from 'jotai';


const geolocationAPI = await navigator.geolocation;


export const getUserCoordinates = (setlat, setlong) => {
    try{
    if (!geolocationAPI) {
      console.log('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } =  position;
        setlat(coords.latitude)
        setlong(coords.longitude)
      })}
    }catch(error){
        console.log('Something went wrong getting your position!')
    }
}



const url = 'https://community-neutrino-ip-info.p.rapidapi.com/ip-info';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'aad022bdfbmshd295cbe9b7967dcp12c548jsnba21205f13a5',
		'X-RapidAPI-Host': 'community-neutrino-ip-info.p.rapidapi.com'
	},
	body: new URLSearchParams({
		'reverse-lookup': 'checked',
		ip: '162.209.106.137'
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
} catch (error) {
	console.error(error);
}



export const locationAtom = atom('')

export const nameAtom = atom('Toooooorroronto')
export const countryAtom = atom('')

export const longitudeAtom = atom();
export const latitudeAtom = atom();





export const locationTimeAtom = atom(null)
export const timeZoneAtom = atom()
export const weatherDataAtom = atom(null)



