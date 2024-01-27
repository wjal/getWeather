import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*const getInitialLocation = async (ip) => {
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
		ip: `${ip}`
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
  return result;
} catch (error) {
	console.error(error);
}

  
};


const response = await fetch('https://geolocation-db.com/json/');
const data = await response.json();
const ip = data.IPv4;
console.log(ip)

const location = await getInitialLocation(ip);
console.log(location)

*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /*latitude={location.latitude} longitude={location.longitude}*/ />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
