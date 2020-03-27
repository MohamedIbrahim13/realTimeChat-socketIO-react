import React from 'react';
import Message from './Message';

const MessageList = ({msgs}) => {
    return (
        <div class="chat-window">
            <ul class="chat-list list-group">
                
               
                {msgs && msgs.map((message,index)=>{
                    return (<Message message={message} key={index}/>)
                })}
            </ul>
        </div>
    )
}

export default MessageList
