import React, { useEffect, useState } from "react";
import { useAuthContext } from '../../contexts/AuthContext';

const Lobby = ({ joinRoom }) => {
    const { user } = useAuthContext();

    const [userName, setUserName] = useState(user.userModel.userName);
    const [room, setRoom] = useState(user.userModel.id);

    return <form onSubmit={e => {
        e.preventDefault();
        let answer = (window.confirm("Do you want to open a chat with an employee?"));
        if (answer) {
            joinRoom(user, room);
        } else {
            console.log("Cancelled.")
        }
    }}>

        <input className="input" placeholder="name" onChange={e => setUserName(e.target.value)} hidden />
        <input className="input" placeholder="room" onChange={e => setRoom(e.target.value)} hidden />
        <button className="chatButton" type="submit" disabled={!userName || !room}>Start a new chat</button>
    </form>
}

export default Lobby;