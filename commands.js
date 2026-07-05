const fs=require('fs');
const path=require('path');
const logger=require('./logger');
const AppError=require('./errors');
const fsPromises = require('fs/promises');

// COPY COMMAND
async function copyFile(source,destination){

    //check wheather it exists or nah
    if(!source || !destination){
        throw new AppError('Source and destination paths are required',400);
    }
    try{
        //// fsPromises.access checks if the file EXISTS and is ACCESSIBLE
        await fsPromises.access(source)
    }catch{
        throw new AppError(`Source file ${source} does not exist or is not accessible`,404);
    }
    //actual copy using STREAMS
    await new Promise((resolve,reject)=>{
        const readStream=fs.createReadStream(source);
        const writeStream=fs.createWriteStream(destination);
        //// pipe: connects read → write automatically, handles backpressure
    // (backpressure = write is slower than read, pipe handles the throttling)

        readStream.pipe(writeStream);
        

    }
)

}