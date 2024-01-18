
const SevenDayForecast = (props) =>{

        return (
            <>
            <p>Today: High {JSON.stringify(props.weatherData.timelines.daily[0].values.temperatureMax)}</p>
            <p>Today: Low {JSON.stringify(props.weatherData.timelines.daily[0].values.temperatureMin)}</p>
            <p>Tomorrow: High {JSON.stringify(props.weatherData.timelines.daily[1].values.temperatureMax)}</p>
            <p>Tomorrow: Low {JSON.stringify(props.weatherData.timelines.daily[1].values.temperatureMin)}</p>
            </>
        )

}

export default SevenDayForecast;