import React, { useState } from "react";
import "./Notification.css"

const Notification = props => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);
    let renderType;
    let timeToClose = 50
    if (props.time != null)
        timeToClose = props.time



    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 120) {
                    return prev + 0.5;
                }
                clearInterval(id);
                return prev;
            });
        }, timeToClose);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 1000)
    };

    React.useEffect(() => {
        if (width === 120) {
            // Close notification
            handleCloseNotification()
        }
    }, [width])

    React.useEffect(() => {
        handleStartTimer();
    }, []);


    if (props.type.toUpperCase() == "SUCCESS") {
        renderType = <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item success ${exit ? "exit" : ""}`}>
            <button className="notification-close" onClick={handleCloseNotification}>&#x2716;</button>
            <h2>{props.type}</h2>
            <p>{props.message}</p>
            <div className={"bar "} style={{ width: `${width}%` }} />
        </div >
    }
    if (props.type.toUpperCase() == "ERROR") {
        renderType = <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item error ${exit ? "exit" : ""}`}>
            <button className="notification-close" onClick={handleCloseNotification}>&#x2716;</button>
            <h2>{props.type}</h2>
            <p>{props.message}</p>
            <div className={"bar "} style={{ width: `${width}%` }} />
        </div>
    }
    if (props.type.toUpperCase() == "WARNING") {
        renderType = <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item warning ${exit ? "exit" : ""}`}>
            <button className="notification-close" onClick={handleCloseNotification}>&#x2716;</button>
            <p>{props.message}</p>
            <div className={"bar "} style={{ width: `${width}%` }} />
        </div>
    }
    if (props.type.toUpperCase() == "INFO") {
        renderType = <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item info ${exit ? "exit" : ""}`}>
            <button className="notification-close" onClick={handleCloseNotification}>&#x2716;</button>
            <p>{props.message}</p>
            <div className={"bar "} style={{ width: `${width}%` }} />
        </div>
    }
    if (props.type.toUpperCase() == "DIALOG-WARNING") {
        renderType = <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item warning ${exit ? "exit" : ""}`}>
            <button className="notification-close" onClick={handleCloseNotification}>&#x2716;</button>
            <p>{props.message}</p>
            <button className="btn">YES</button>
            <button className="btn">NO</button>
        </div>
    }


    return (
        <div className={"notification-wrapper "}>
            <div className="notification-clickblocker">
                {renderType}
            </div>
        </div>
    );
};

export default Notification;