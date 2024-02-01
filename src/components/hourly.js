import Slider from "react-slick";
import SevenDayForecast from "./sevenDayForecast";

const Hourly = ({ hourlyData }) => {
    return (
      <Slider>
        {hourlyData.map((hourData, index) => (
          <>
            {console.log(hourlyData)}

            <p key={index} data={hourData} > {index}</p>

          </>
           
        ))}
      </Slider>
    );
  };

  export default Hourly;