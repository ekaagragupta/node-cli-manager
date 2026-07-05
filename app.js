//entry point for the application

require('dotenv').config();

const {copyFile, fileStats} = require('./commands');    
const logger = require('./logger');
const AppError = require('./errors');

//process : node -> app.js -> copy -> file1-> file2

const [command, ...args] = process.argv.slice(2); 

async function main() {
    try{
        logger.log(`Command received :"${command}"with arguments: ${args.join(', ')}`);
        //log every command received with its arguments to the log file and console
        if(!command){
            throw new AppError("No command provided", 400);
        }
        switch(command){
            case 'copy':
                await copyFile(args[0], args[1]);
                console.log(`COPY command executed successfully"`);
                break;
            case 'stats':
                await fileStats(args[0]);
                break;
            default:
                throw new AppError(`Unknown command: ${command}`, 400);
        }
    }catch(err){
        if(err instanceof AppError){
            console.error(`\n Error ($)`)
    }
}