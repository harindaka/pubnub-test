module.exports = function(roomName, ctx) {
    console.log('Joining room "%s"...', roomName);

    let PubNub = require('pubnub');
    
    pubnub = new PubNub({
        publishKey : 'pub-c-7a402aa7-6957-43b3-88ac-e1fe6365cca1',
        subscribeKey : 'sub-c-ee73b7fe-1070-11e7-b568-0619f8945a4f'
    })
       
    function publish(chat) {
        var publishConfig = {
            channel : roomName,
            message : {
                senderUsername: 'john',
                chat: chat
            }
        }
        
        pubnub.publish(publishConfig, function(status, response) {
            //console.log(status, response);
        })
    }
       
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log('Done. Enter your message below and press enter');
                let rl = require('readline-sync');
                let chat = rl.question('> ');
                publish(chat);
            }
        },
        message: function(payload) {
            console.log('[' + payload.message.senderUsername + ']: ' + payload.message.chat);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    });      
            
    pubnub.subscribe({
        channels: [roomName] 
    });
};

module.exports.$option = ['-j, --join <channel name>', 'The name of the chat room to join']