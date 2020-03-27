import React from 'react';


const RoomList = ({room}) => {
    
    
    return (
        <div>
            <h4 className="card-title text-center">Our Chat Here</h4>
            <div className="chat-rooms mb-3 text-center">
                <div className="my-2">Your chatroom is :</div>
                <button className="btn btn-info btn-lg btn-sm" id="general">#{room}</button>
                
            </div>
        </div>
    );
    
}

export default RoomList
