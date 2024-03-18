import Detail from "../Detail"
import './BottomRow.css'

const BottomRow = ({weatherData}) => {





    return (
        <div className="bottom-row-today">
            <Detail detail={weatherData.timelines.minutely[0].values.precipitationProbability} title="Precipitation" character="%" icon="detailIcons/precipitation.png"/>
            <div className="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.humidity} title="Humidity" character="%" icon="detailIcons/humidity.png"/>
            <div className="bar"></div>
            <Detail detail={(weatherData.timelines.minutely[0].values.pressureSurfaceLevel / 10).toFixed(2)} title="Pressure" character="kPa" icon="detailIcons/barometer.png"/>
            <div className="bar"></div>
            <Detail detail={(weatherData.timelines.minutely[0].values.cloudCeiling * 1600).toFixed(0)} title="Ceiling" character="m" icon="detailIcons/ceiling.png"/>
            <div className="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.cloudCover} title="Cloud Cover" character="%" icon="detailIcons/cloudy-day.png"/>
            <div className="bar"></div>
            <Detail detail={weatherData.timelines.minutely[0].values.windSpeed} title='Wind Speed' character="km/h" icon="detailIcons/wind.png"/>  
        </div>
    )
}


export default BottomRow;