module.exports = function(roomName) {
    var self = this;

    self.roomName = roomName;

    let PubNub = require('pubnub');    
    self.pubnub = new PubNub({
        publishKey : 'pub-c-7a402aa7-6957-43b3-88ac-e1fe6365cca1',
        subscribeKey : 'sub-c-ee73b7fe-1070-11e7-b568-0619f8945a4f'
    })

    self.pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                initialize();
            }
        },
        message: function(payload) {
            console.log('[' + payload.message.senderUsername + ']: ' + payload.message.chat);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    });

    self.join = function(nickname){
        console.log('Joining room "%s"...', self.roomName);
        self.pubnub.subscribe({            
            channels: [roomName] 
        });
    }

    function initialize(){
        console.log('You are now in chat. Press any key to enter a message. (Ctrl + c to quit).');
        
        var keypress = require('keypress');

        // make `process.stdin` begin emitting "keypress" events 
        keypress(process.stdin);

        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                console.log('You have left the room.');
                process.exit();
            }
            else if(key){             
                process.stdin.pause();   
                process.stdin.setRawMode(false);        
                let rl = require('readline-sync');
                let chat = rl.question('> ');
                publish(chat);
                process.stdin.setRawMode(true);
                process.stdin.resume();
            }
        });
            
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    function publish(chat) {
        var publishConfig = {
            channel : roomName,
            message : {
                senderUsername: 'john',
                chat: chat
            }
        }
        
        self.pubnub.publish(publishConfig, function(status, response) {
            //console.log(status, response);
        })
    }
};



