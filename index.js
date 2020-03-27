const express =require('express');
const socket = require('socket.io');
const http = require('http');
const cors =require('cors');
const app = express();
const moment =require('moment');
app.use(cors());

const server = http.createServer(app);
const io = socket(server);

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

//   if(!name || !room) return { error: 'Username and room are required.' };
//   if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return user ;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


io.on('connection',(socket)=>{
    
    socket.on('join',({name,room})=>{
        const user = addUser({id:socket.id,name,room});
        socket.join(user.room);
        socket.emit('chat',{name:'Admin',text:'Welcome to the chat',time:moment().format('h:mm a')});
        socket.broadcast.to(user.room).emit('chat',{name:'Admin',text:`${user.name} has joined the room`,time:moment().format('h:mm a')})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
    })
    
    socket.on('chatMessage',(message)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('chat',{name:user.name,text:message,time:moment().format('h:mm a')});
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        
    });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('chat',{name:'Admin',text:`${user.name} has left the room`,time:moment().format('h:mm a')})
        }
        
    });
});




const port = process.env.PORT || 4000;
server.listen(port,()=>{
    console.log(`We are listening to port ${port}`)
});