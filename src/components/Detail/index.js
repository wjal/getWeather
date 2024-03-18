import { useEffect, useState } from "react";
import './Detail.css'
const Detail = (props) => {

    const [detail, setDetail] = useState();

    const calcLongitude = (detail) => {
        const long = detail >= 0 ? `${(Math.round(detail * 100) / 100)} °N`: `${-1*(Math.round(detail * 100) / 100)} °S`;
        return long;
    }
    const calcLatitude = (detail) => {
        const long = detail >= 0 ? `${(Math.round(detail * 100) / 100)} °E`: `${-1*(Math.round(detail * 100) / 100)} °W`;
        return long;
    }

    useEffect(()=>{
        if(props.title === 'Longitude'){
            setDetail(calcLongitude(props.detail))
        }
        else if(props.title === 'Latitude'){
            setDetail(calcLatitude(props.detail))
        }else{
            setDetail(props.detail)
        }
    })

    return (
        <div className="detail">
                    <h3 className="detail-title">{props.title}</h3>
                    <img className="detail-icon" src={props.icon} alt="icon"/>
                    <h4 className="detail-value">{detail} {props.character}</h4>
        </div>
    )
}


export default Detail;