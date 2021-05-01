import React from 'react'
import "./Message.css"

export const Message = ({message, userId}) => {

    const {text,name} = message;
    return (
        <div className={userId === message.userId ? "message-right" : "message-left"}>
            <div className="user-message">
            {userId === message.userId ? null : <h6>{name}</h6>}
            <p>{text}</p>
            </div>
        </div>
    )
}
