const fs = require("fs");
const path = require("path");
const logger = require("./logger");
const AppError = require("./errors");
const fsPromises = require("fs/promises");

// COPY COMMAND
async function copyFile(source, destination) {
    //check wheather it exists or nah
    if (!source || !destination) {
        throw new AppError("Source and destination paths are required", 400);
    }
    try {
        //// fsPromises.access checks if the file EXISTS and is ACCESSIBLE
        await fsPromises.access(source);
    } catch {
        throw new AppError(
            `Source file ${source} does not exist or is not accessible`,
            404,
        );
    }
    //actual copy using STREAMS
    await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(source);
        const writeStream = fs.createWriteStream(destination);
        //// pipe: connects read → write automatically, handles backpressure
        // (backpressure = write is slower than read, pipe handles the throttling)

        readStream.pipe(writeStream);
        writeStream.on("finish", () => {
            logger.log(`COPY success: "${source}" → "${destination}"`);
            resolve(); // tells the Promise: "we're done, successfully"
        });
        writeStream.on("error", (err) => {
            reject(new AppError(`Write failed: ${err.message}`, 500));
        });
        readStream.on("error", (err) => {
            reject(new AppError(`Read failed: ${err.message}`, 500));
        });
    });
}

// STATS COMMAND
async function fileStats(filename) {
    if (!filename) {
        throw new AppError("File name is required", 400);
    }
    try {
        const stats = await fsPromises.stat(filename);
        const info = {
            filename,
            sizeBytes: stats.size,
            sizeKB: (stats.size / 1024).toFixed(2),
            created: stats.birthtime.toLocaleString(),
            modified: stats.mtime.toLocaleString(),
        };
        logger.log(`STATS checked: "${filename}" (${info.sizeKB} KB)`);

        // Print formatted output to terminal
        console.log("\n📄 File Stats:");
        console.log(`  Name:          ${info.filename}`);
        console.log(`  Size:          ${info.sizeBytes} bytes (${info.sizeKB} KB)`);
        console.log(`  Created:       ${info.created}`);
        console.log(`  Last Modified: ${info.lastModified}`);
    } catch (err) {
        throw new AppError(
            `Failed to get stats for file "${filename}": ${err.message}`,
            500,
        );
    }
}

module.exports = { copyFile, fileStats };
