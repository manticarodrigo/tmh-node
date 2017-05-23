var chatsDB = require('./chats.db');
module.exports = function(io) {
 
    var chats = io.of('/chats');
 
    chats.on('connection', function(socket) {

        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('join', function(room) {
            console.log("Someone is trying to join room:");
            console.log(room);
            socket.join(room);
            chatsForRoom(room);
        });
 
        socket.on('fetchChatsFor', function(projectIds) {
            console.log("Fetching chats for project ids : " + projectIds);
            chatsDB.fetchChatsFor(projectIds, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                chats.emit('fetchChatsFor', data);
            });
        });
 
        socket.on('chatFor', function(projectId) {
            console.log("Chat for project with id : " + projectId);
            chatDB.chatFor(projectId, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                chats.emit('chatFor', data);
            });
        });
 
        socket.on('updateChat', function(chat) {
            chatsDB.updateChat(chat, function (err, data) {
                if (err) throw err; // You can emit the error to a socket 
                chats.emit('updateChat', data);
            });
        });

        // socket.on('deleteChat', function(chat) {
        //     chatsDB.deleteChat(chat, function(err, data) {
        //         if (err) throw err; // You can emit the error to a socket 
        //         io.of('/chats').emit('deleteChat', data);
        //     });
        // });

    });

    function socketForRoom (room) {
        console.log("Accessing messages for project with id : " + room);
        // chatsDB.messagesFor(room, function (err, data) {
        //     if (err) throw err; // You can emit the error to a socket 
        //     io.in(room).emit('messages', data);
        // });
    }
 
    return chats;
}