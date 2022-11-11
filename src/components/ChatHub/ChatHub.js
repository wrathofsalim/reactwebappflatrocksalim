import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Lobby from './Lobby';
import InboxAdminEmployees from './InboxAdminEmployees';
import { useAuthContext } from '../../contexts/AuthContext';
import "./Chat.css"

export default function ChatHub() {
    const { user } = useAuthContext();

    const [connection, setConnection] = useState();

    const [messages, setMessages] = useState([]);

    const [rooms, SetRooms] = useState([]);
    const [chatStatus, setChatStatus] = useState(false);

    const [roomCreatorId, SetRoomCreatorId] = useState([])

    useEffect(() => {
        if (chatStatus == true) {
            if (user.userRoles != "Admin" && user.userRoles != "Employee") {
                joinRoom(user, user.userModel.id);
            } else {
                allRooms();
            }
        } else if (chatStatus == false) {
            if (connection != null)
                closeConnection();
        }
    }, [chatStatus])

    useEffect(() => {
        closeConnection();
    }, [user])

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7216/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user = user.userModel.userName, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.onclose(e => {
                setConnection();
                setMessages([]);
            });

            await connection.start();

            if (user.userRoles != "Admin" && user.userRoles != "Employee") {
                try {
                    await connection.invoke("CreateRoom", user.userModel.userName, user.userModel.id);

                } catch (error) {
                    console.log()
                }
            }
            await connection.invoke("JoinRoom", { user: user.userModel.userName, room })
            SetRoomCreatorId(room)
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message, senderId, sendName) => {
        try {
            await connection.invoke("SendMessage", message, senderId, sendName)
        } catch (error) {
            console.log(error)
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (error) {
            console.log(error);
        }
    }

    const allRooms = async () => {
        try {
            SetRooms([])
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7216/chat")
                .configureLogging(LogLevel.Information)
                .build();

            await connection.start();

            let result = await connection.invoke("GetAllRooms")
            let gotov = Object.keys(result).map((key) => [key, result[key]])

            gotov.forEach(element => {
                SetRooms(rooms => [...rooms, element]);
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    const openChat = () => {
        var element = document.querySelector(".chatPopup")
        element.classList.toggle("hidethechat");
        if (chatStatus == false) {
            setChatStatus(true)
        } else {
            setChatStatus(false)
        }
    }

    return (
        <>
            <button className="chatPopupImage" onClick={openChat} >
                <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" />
            </button>

            <div className="chatPopup hidethechat">
                {
                    (user.userRoles == "Admin" || user.userRoles == "Employee")
                    &&
                    <button style={{ bottom: 100, border: 0 }} className="refreshButton" onClick={allRooms}>
                        <img src="https://cdn-icons-png.flaticon.com/512/391/391192.png" alt="" />
                    </button>
                }

                <h2>Messages</h2>

                {
                    !connection
                        ? (
                            (user.userRoles == "Admin" || user.userRoles == "Employee")
                                ? (
                                    <div className="inbox">
                                        {
                                            (
                                                rooms.length == 0
                                                && <h2>Empty</h2>
                                            )
                                            ||
                                            <>
                                                <h2>Active chats</h2>
                                                {rooms.map(
                                                    x =>
                                                        < InboxAdminEmployees key={x} currentRoom={x} joinRoom={joinRoom} />
                                                )}
                                            </>
                                        }
                                    </div>
                                )
                                : <Lobby joinRoom={joinRoom} />
                        )
                        : <Chat
                            reloadChatProps={[connection, roomCreatorId]}
                            messages={messages}
                            sendMessage={sendMessage}
                            closeConnection={closeConnection} />

                }
            </div>
        </>
    )
}



