module.exports = function(roomName, context) {
    let Chatroom = require('./utils/chatroom');
    let chatroom = new Chatroom(roomName);
    chatroom.join();
};

module.exports.$option = ['-j, --join <channel name>', 'The name of the chat room to join']