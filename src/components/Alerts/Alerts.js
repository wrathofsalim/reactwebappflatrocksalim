import React, { useState } from 'react';
import "./Alerts.css"

export default function Alert({ text, type }) {
    let render;

    if (type.toLowerCase() == "danger") {
        render =
            <div className='container-fluid col-sm-4 md-2 alert_box danger'>
                {text}
            </div>
    }



    return (
        <>
            {render}
        </>
    )
}