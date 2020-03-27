import React from 'react';
// import moment from 'moment';

const Message = ({message}) => {
    return (
        <div>
            <li>
                <span className="text-danger"><em>{message.name}</em></span> : <span className="username">{message.text}</span>
                <p className="text-muted">{message.time}</p>
            </li>
        </div>
    )
}

export default Message
