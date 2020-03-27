import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Join = () => {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    return (
        
            <>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                    <label htmlFor="name" className="sr-only">Get a name</label>
                    <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Name.." required autofocus/>
                    <label htmlFor="room" className="sr-only">Join a room</label>
                    <input type="text" id="room" value={room} onChange={(e)=>{setRoom(e.target.value)}} className="form-control" placeholder="Room.." required/>

                    <Link onClick={e=>(!name || !room) ? e.preventDefault() : null} to={`/join?name=${name}&room=${room}`}>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Start Chat</button>
                    </Link>
                </form>
            </>
        
    );
}

export default Join
