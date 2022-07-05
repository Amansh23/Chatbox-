const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var id= [];
var userarr=[]
io.on( "connection", function( socket ) {
    var user ;
    
    socket.emit("userid",socket.id)
    socket.on("username",function(username){
      user = username;
      userarr.push(user)
      io.emit('onlineusername',userarr)
    io.emit("onlineuser", {length: id.length})
       
    })
    id.push(socket.id) 

   
    console.log(id)
    
    socket.on("msg",function(textmessage){
        io.emit("reply",{userid:socket.id,textmessage :textmessage, user:user})
    })
    console.log(id.length)
    console.log(id)

    socket.on("disconnect",function(){
        id.splice(id.indexOf(socket.id),1)
        console.log(userarr)
        userarr.splice(userarr.indexOf(user),1)
        console.log(userarr)
        io.emit("onlineuser", {length: id.length})
        io.emit('onlineusername',userarr)

    })

    socket.on("typing",function(value){
        socket.broadcast.emit("usertyping", value)
    })


});


module.exports = socketapi;