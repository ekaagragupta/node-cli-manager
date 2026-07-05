//event emitter in real use

const EventEmitter = require('events');
const fs= require('fs'); //// using SYNC appending here intentionally
require('dotenv').config();

class Logger extends EventEmitter {
    constructor() {
        super(); //for extending a class instances
        const logFile = process.env.LOG_FILE_PATH || 'logs.txt'; // || 'logs.txt' is here  default log file path , if LOG_PATH_FLE is missing so it will be redirected to log.txt

        //setting up own custom log event right inside the constructor
        this.on('log',(message) => {
            const timestamp=new Date().toISOString();
            //toISOString() gives standard format of date and time in UTC format
            const logLine=`[${timestamp}] ${message}\n`
            fs.appendFileSync(logFile,logLine); 
            //appending the log line to the log file without deleting old content
            console.log(logLine.trim());
            //trim() is used to remove the extra new line character at the end of the log line
        }
    
    );
    //using convenience methods , instead of calling baar baar logger.emit('log',message) we can use logger.log(message) directly
    //abb just call logger.log(message) to log the message to the log file and console
    log(message){
        this.emit('log',message);
    }
    }
}
module.exports = new Logger();
//