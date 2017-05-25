var config = require('../config');
var mongojs = require('mongojs');
var db = mongojs(config.mongoDB.host, ['messages']);

var messages = {
    messagesFor: function(room, callback) {
        db.messages.find({_id: room}, callback);
    },
    addMessageFor: function(message, room, callback) {
        var newMessage = {};
        newMessage[new Date().getTime()] = message;
        db.messages.update({
            _id: room
        },  {$set: newMessage}, {upsert:true}, callback);
    }
}
 
module.exports = messages;