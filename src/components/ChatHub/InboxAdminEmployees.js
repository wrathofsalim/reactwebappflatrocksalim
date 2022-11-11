import React, { useEffect, useState } from "react";
import { useAuthContext } from '../../contexts/AuthContext';

const InboxAdminEmployees = ({ currentRoom, joinRoom }) => {
    const { user } = useAuthContext();
    const [userName, setUserName] = useState();
    const [room, setRoom] = useState([]);

    useState(() => {
        // console.log(currentRoom[1])
        setUserName(currentRoom[1].name)
        setRoom(currentRoom[1].createdById);

    })

    return <form className="inbox_box" onClick={e => {
        e.preventDefault();

        joinRoom(user, room);
    }}>
        {<div>{userName}</div>}
    </form>
}

export default InboxAdminEmployees;
