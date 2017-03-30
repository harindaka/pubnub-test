module.exports = function(val, ctx) {
    console.log("Joining channel %s", val);

    let PubNub = require('pubnub');
    
    pubnub = new PubNub({
        publishKey : 'pub-c-7a402aa7-6957-43b3-88ac-e1fe6365cca1',
        subscribeKey : 'sub-c-ee73b7fe-1070-11e7-b568-0619f8945a4f'
    })
       
    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : val,
            message : "Hello from PubNub Docs!"
        }
        pubnub.publish(publishConfig, function(status, response) {
            //console.log(status, response);
        })
    }
       
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("New Message!!", message.message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    });      
            
    pubnub.subscribe({
        channels: [val] 
    });
};