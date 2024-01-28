import { useEffect, useState } from "react";

const LocationTime = (props) => {
    return (
        <div className="detail">
                    <h3 className="location-detail-content">{props.title}</h3>
                    <h4 className="location-detail-content">{props.detail} {props.character}</h4>
                    { //<img className="location-detail-icon" src={props.icon} alt="icon"/>
}
        </div>
    )
}


export default LocationTime;