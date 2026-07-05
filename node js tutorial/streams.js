const readstream = fs.createReadStream('sampleData.txt',{encoding : 'utf8', highWaterMark: 16 * 1024    });

readstream.on('data', w(chunk) => {
    console.log(chunk);...
});