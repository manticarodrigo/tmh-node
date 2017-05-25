var messagesDB = require('./messages.db');
module.exports = function(io) {
 
    var messages = io.of('/messages');
 
    messages.on('connection', function(socket) {

        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('join', function(room) {
            console.log("Someone is trying to join room:");
            console.log(room);
            socket.join(room);
            messagesForRoom(room);
        });

        // once a client disconnects, we expect to get a ping from them saying what room they want to leave
        socket.on('leave', function(room) {
            console.log("Someone left room:");
            console.log(room);
            socket.leave(room);
        });
 
        socket.on('messagesFor', function(room) {
            console.log("Fetching messages for room : " + room);
            messagesDB.messagesFor(room, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                messages.emit('fetchMessagesFor', data);
            });
        });

        socket.on('addMessage', function(data) {
            console.log("Adding message with data:");
            console.log(data);
            const message = data.message;
            const room = data.room;
            messagesDB.addMessageFor(message, room, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                console.log("Emitting message data on success:");
                console.log(data);
                messages.emit('addMessage', data);
                messages.in(room).emit('new message', message);
            });
        });

    });

    function messagesForRoom (room) {
        console.log("Accessing messages for project with id : " + room);
        messagesDB.messagesFor(room, function (err, data) {
            if (err) throw err; // You can emit the error to a socket 
            messages.in(room).emit('messages', data);
        });
    }
 
    return messages;
}