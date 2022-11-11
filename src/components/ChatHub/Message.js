import React, { useState, useEffect, useRef } from "react";
import * as userServices from "../../services/UserService"


const Message = ({ reloadChatProps, messages, user }) => {
    const messageRef = useRef()
    const [reloadChat, setReloadChat] = useState([])

    const reloadChats = async () => {
        let res = await reloadChatProps[0].invoke("ReloadMessagedInChat", (reloadChatProps[1]));
        setReloadChat(res)
        console.log(res)
        return res
    }

    useEffect(() => {
        reloadChats();

        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0,
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            })
        }
    }, [])

    return <div ref={messageRef} className="chat">
        {
            reloadChat.map((m, index) =>
                // console.log(m)
                <div key={index}>
                    {console.log(user)}
                    {
                        m.senderName == "default"
                        &&
                        <div className="message-center center">{m.message}</div>
                    }
                    {
                        (m.senderName != "default" && m.senderName == user)
                        &&
                        <div>
                            <div className="message-right right ">{m.message}</div>
                            <div className="from-user right">{m.senderName}</div>
                        </div>
                    }
                    {
                        (m.senderName != "default" && m.senderName != user)
                        &&
                        <div>
                            <div className="message-left left ">{m.message}</div>
                            <div className="from-user left">{m.senderName}</div>
                        </div>
                    }


                </div>)
        }
        {messages.map((m, index) =>
            <div key={index}>

                {
                    m.user == "default"
                    &&
                    <div className="message-center center">{m.message}</div>
                }
                {
                    (m.user != "default" && m.user == user)
                    &&
                    <div>
                        <div className="message-right right ">{m.message}</div>
                        <div className="from-user right">{m.user}</div>
                    </div>
                }
                {
                    (m.user != "default" && m.user != user)
                    &&
                    <div>
                        <div className="message-left left ">{m.message}</div>
                        <div className="from-user left">{m.user}</div>
                    </div>
                }


            </div>
        )}
    </div>
}

export default Message;
