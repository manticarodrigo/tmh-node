var config = require('../config');
var mongojs = require('mongojs');
var chatsDB = mongojs(config.mongoDB.host, ['chats']);
 
var chats = {
 
    fetchChatsFor: function(projectIds, callback) {
        var promises = [];
        projectIds.forEach(function(id) {
            const promise = new Promise(function(resolve, reject) {
                chatsDB.chats.find({_id: id}, function (value, index, obj) {
                    console.log(value);
                    console.log(index);
                    console.log(obj);
                    resolve(value);
                });
            });
            promises.push(promise);
        });
        callback(Promise.all(promises));
    },
    chatFor: function(projectId, callback) {
        chatsDB.chats.find({_id: projectId}, function (value, index, obj) {
            console.log(value);
            console.log(index);
            console.log(obj);
            callback(value);
        });
    },
    updateChat: function(chat, callback) {
        chatsDB.chat.update({
            _id: chat._id
        }, chat, {}, callback);
    }
}
 
module.exports = chats;