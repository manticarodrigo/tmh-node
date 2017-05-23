module.exports = function(server) {
    var io = require('socket.io')(server);
 
    io.on('connection', function(socket) {
    	// the primary socket at '/' 
    });
 
    var chats = require('../chats')(io);
    var messages = require('../messages')(io);
    return io;
};