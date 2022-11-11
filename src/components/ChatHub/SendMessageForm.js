import React, { useState } from "react";
import { EmojiButton } from '@joeattardi/emoji-button';
import { useAuthContext } from "../../contexts/AuthContext";

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const { user } = useAuthContext();

    const picker = new EmojiButton({
        position: {
            bottom: "96px",
            right: '26px'
        }
        , zIndex: 999,
    });
    const trigger = document.querySelector('.trigger');

    picker.on('emoji', selection => {
        if (selection != null)
            setMessage(message + selection.emoji)
    });

    return <form onSubmit={e => {
        e.preventDefault();
        console.log(e);
        if (message == '') return;
        sendMessage(message, user.userModel.id, user.userModel.userName);
        setMessage('');

    }}>
        <div>
            <input className="messageInput" type="text" placeholder="message"
                onChange={e => setMessage(e.target.value)} value={message} />

            <button className="sendButton" type="submit" disabled={!message}>
                <img src="https://cdn-icons-png.flaticon.com/512/4602/4602117.png" alt="" />
            </button>

            <button className='emojiButton'
                onClick={(e) => {
                    e.preventDefault();
                    picker.togglePicker(trigger);
                }}>
                <img src="https://cdn-icons-png.flaticon.com/512/356/356749.png" alt="" />
            </button>
        </div>
    </form>
}

export default SendMessageForm;