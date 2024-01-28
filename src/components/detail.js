import { useEffect, useState } from "react";

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
                    <h3 className="detail-content detail-title">{props.title}</h3>
                    <h4 className="detail-content detail-value">{detail} {props.character}</h4>
                    <img className="detail-icon" src={props.icon} alt="icon"/>
        </div>
    )
}


export default Detail;