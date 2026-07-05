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
    }
}