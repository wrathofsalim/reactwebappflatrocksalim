import React, { useEffect, useState } from "react";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";
import { useAuthContext } from '../../contexts/AuthContext';

const Chat = ({ reloadChatProps, messages, sendMessage, closeConnection }) => {
    const { user } = useAuthContext();


    return <div >
        <div className="leaveRoom">
            <button onClick={() => { closeConnection() }}> Leave chat. </button>
        </div>
        <br />
        <div>
            <Message reloadChatProps={reloadChatProps} messages={messages} user={user.userModel.userName} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div >
}

export default Chat;
