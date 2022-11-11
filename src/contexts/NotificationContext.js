import React, { createContext, useContext, useReducer, useState } from "react";
import { v4 } from "uuid";
import Notification from "../components/Notifications/Notification";

const NotificationContext = createContext();

const NotificationProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [{ ...action.payload }];
            case "REMOVE_NOTIFICATION":
                return state.filter(el => el.id !== action.id);
            default:
                return state
        }
    }, []);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className="notification-outer">
                <div className="notification-inner">
                    {state.map((note) => {
                        return <Notification dispatch={dispatch} key={note.id} {...note} />
                    })}
                    {props.children}
                </div>
            </div>
        </NotificationContext.Provider>
    )
};

export const useNotification = () => {
    const dispatch = useContext(NotificationContext);

    return (props) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                ...props
            }
        })
    }
};

export default NotificationProvider;