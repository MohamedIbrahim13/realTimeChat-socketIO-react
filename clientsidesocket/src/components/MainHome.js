import React,{useState,useEffect} from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import io from 'socket.io-client';
import queryString from 'query-string';
import Users from './Users';

let socket;
const MainHome = ({location}) => {
  const [name,setName] = useState('');
  const [room,setRoom]= useState('');
  const [message,setMessage]=useState('');
  const [msgs,setMsgs]=useState([]);
  const [users, setUsers] = useState('');
  const EndPoint ='http://localhost:4000';

  useEffect(()=>{
    socket = io(EndPoint);
    const {name,room} = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket.emit('join',{name,room});

    return ()=>{
      socket.emit('disconnect');
      socket.off();
    }
  },[EndPoint,location.search]);

  useEffect(()=>{
    socket.on('chat',(message)=>{
      setMsgs([...msgs,message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  },[msgs]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(message){
      socket.emit('chatMessage',message,()=>setMessage(''));
    }
  };
    
    return (
        <div className="container">
          <div className="row">
            <div className="col-3"></div>      
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 card mb-1">
                <div className="card-body">
                    <RoomList room={room}/>
                    <MessageList msgs={msgs}  />
                    <SendMessageForm  message={message} setMessage={setMessage} handleSubmit={handleSubmit}/>
                    
                </div>
                <Users users={users}/>
            </div>
          </div>
        </div>
      );
}

export default MainHome
