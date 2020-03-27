import React from 'react';


const SendMessageForm = ({message,setMessage,handleSubmit}) => {
    
    
    return (
        <>
            <form className="new-name my-3">
                <div className="input-group">
                    <input type="text" id="message"  className="form-control" value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyPress={(event)=>event.key === "Enter" ? handleSubmit(event) : null} placeholder="Type your message..."  required/>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-success btn-lg btn-sm">Send</button>
                </div>
                
            </form>
            
        </>
    )
}

export default SendMessageForm
