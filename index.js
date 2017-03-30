(function(){

    console.log("pubnub-test started...");

    let args = require('commander');

    //option definitions
    args.version('0.0.1')
    .usage('[options]')
    .option('-c, --channel <channel name>', 'The chat channel name to join')
    .parse(process.argv);

    let methods = {};

    //method definitions related to mutually exclusive main options
    methods.channel = require('./options/channel');

    let method = null;
    let option = null;
    for(optionName in methods){
        if(methods.hasOwnProperty(optionName) && typeof args[optionName] !== "undefined" && args[optionName] !== null){
            option = optionName;
            method = methods[optionName];
            break;
        }
    }

    if(method !== null){
        let context = {};
        context.args = args;

        method(args[option], context);
    }
    else{
        console.log("No option specified. Use the option --help to check usage.");
    }

})();