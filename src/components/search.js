import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import { GEO_API_URL, geoDataOptions } from '../api';


const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);
    
    
        async function loadOptions(inputValue) {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'aad022bdfbmshd295cbe9b7967dcp12c548jsnba21205f13a5',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                };
                const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=${50000}&namePrefix=${inputValue}`, options);
                const responseJSON = await response.json();
                
                return { options: responseJSON.data.map ((city) => {
                    return {
                        value: `${city.latitude},${city.longitude},${city.name},${city.country}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })}
            }catch(error){
                console.log(error);
            }
}

    const handleOnChange = async (searchData) => {
        await setSearch(searchData);
        await onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder='Search for a city'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} 
        />

    )
}

export default Search;