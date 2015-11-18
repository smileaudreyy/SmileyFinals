var express = require('express')
, app = express()
, server = require('http').createServer(app)
, socketio = require('socket.io');
 
// Use www as the "root" directory for all requests.
// if no path is given, it will look for index.html in that directoy.
app.use(express.static('www'));

// Start the server listening on a port
server.listen(3000, function(){
	console.log ("server listening on port " + 3000);
});

// When we get a connection, 
socketio.listen(server).on('connection', function (socket) {
	//create a listener for this particular socket
	console.log("Got a connection on socket : " + socket);
	
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});