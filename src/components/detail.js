import { useEffect, useState } from "react";

const Detail = (props) => {
    return (
        <div>
                    <h3 className="daily-content">{props.detail}</h3>
                    <h2 className="daily-content">{props.title}</h2>
        </div>
    )
}


export default Detail;