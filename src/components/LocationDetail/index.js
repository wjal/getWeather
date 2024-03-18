import { useEffect, useState } from "react";

const LocationDetail = (props) => {

    const [detail, setDetail] = useState()
    const calcLongitude = (detail) => {
        const long = detail >= 0 ? `${(Math.round(detail * 100) / 100)} °N`: `${(Math.round(detail * 100) / 100)} °S`;
        setDetail(long);
    }
    const calcLatitude = (detail) => {
        const long = detail >= 0 ? `${(Math.round(detail * 100) / 100)} °E`: `${(Math.round(detail * 100) / 100)} °W`;
         setDetail(long);
    }

    useEffect(()=>{
        if(props.title === 'Longitude'){
            calcLongitude(props.detail)
        }
        if(props.title === 'Latitude'){
            calcLatitude(props.detail)
        }else{
            setDetail(props.detail)
        }
    })
    


    return (
        <div className="detail">
                    <h3 className="location-detail-content">{props.title}</h3>
                    <h4 className="location-detail-content">{detail} {props.character}</h4>
                    <img className="location-detail-icon" src={props.icon} alt="icon"/>
        </div>
    )
}


export default LocationDetail;