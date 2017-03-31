(function(){
    
    let optionModules = getOptions();
    let optionMethods = {};

    let args = require('commander');

    args = args.version('0.0.1').usage('[options]');
    for(let i=0; i < optionModules.length; i++){
        args.option.apply(args, optionModules[i].module.$option); 
        optionMethods[optionModules[i].moduleName] = optionModules[i].module;       
    }
    args.parse(process.argv);

    let method = null;
    let option = null;
    for(optionName in optionMethods){
        if(optionMethods.hasOwnProperty(optionName) && typeof args[optionName] !== "undefined" && args[optionName] !== null){
            option = optionName;
            method = optionMethods[optionName];
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

function getOptions(){
    let path = require('path');
    let files = getFiles(path.join(__dirname, 'options'), '.js');
    
    let options = []; 
    for(let i=0; i < files.length; i++){
        let mod = require(path.join(__dirname, 'options', files[i]));
        
        if(typeof mod.$option !== 'undefined' 
        && mod.$option !== null 
        && Array.isArray(mod.$option)
        && mod.$option.length > 0){
            options.push({
                moduleName: files[i].slice(0, -3),
                module: mod
            });
        }
    }

    return options;
}

function getFiles(dir, ext){
    let path = require('path'), fs=require('fs');

    let matchedFiles = [];
    if (fs.existsSync(dir)){            
        var files=fs.readdirSync(dir);
        for(var i=0;i<files.length;i++){
            let filename = files[i];
            //var filename=path.join(dir,files[i]);
            //var stat = fs.lstatSync(filename);
            // if (stat.isDirectory()){
            //     fromDir(filename,filter); //recurse
            // }
            if (filename.endsWith(ext)) {
                matchedFiles.push(filename);
            };
        };
    }

    return matchedFiles;    
};