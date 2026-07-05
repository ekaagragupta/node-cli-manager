// ============ MODERN WAY: Promises + async/await (what you'll write in real jobs) ============
const fsPromises = require("fs/promises");
// ^ same fs module, but every function now RETURNS A PROMISE instead of taking a callback

async function readFileAsync() {
  try {
    const dataA = await fsPromises.readFile("./file.txt", "utf8");
    const dataB = await fsPromises.readFile("./file2.txt", "utf8");
    console.log(dataA);
    console.log(dataB);
  } catch (err) {
    console.error("somethings failed", err);
  }
}

readFileAsync();

//promise.all
async function readFilesInParallel() {
  try{
    const[dataA,dataB]= await Promise.all([
      fsPromises.readFile("./file.txt", "utf8"),
      fsPromises.readFile("./file2.txt", "utf8")
    ]);
    console.log(dataA);
    console.log(dataB);
  } catch (err) {
    console.error("somethings failed", err);
  }
}

readFilesInParallel();

async function getMultipleFiles(){
  try{
    const [dataA,dataB,dataC] = await promise.all([
      fsPromises.readFile("./file.txt", "utf8"),
      fsPromises.readFile("./file2.txt", "utf8"),
      fsPromises.readFile("./file3.txt", "utf8")

    ]) ;
    console.log(dataA);
    console.log(dataB);
    console.log(dataC);
  }
  catch(err){
    console.error("somethings failed", err);
  }
}