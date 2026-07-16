const fs = require("fs")

// Synchronous 

// const contents1 = fs.readFileSync("a.txt", "utf-8")  
// console.log(contents1)

// const contents2 = fs.readFileSync("b.txt", "utf-8")  // Synchronously
// console.log(contents2)

/* Asynchronous Call back 

function read(err, data){
    if(err){
        console.log("File not found")
    } else{
        console.log(data);
        }  
}

fs.readFile("a.txt", "utf-8", read) // Asynchronously
fs.readFile("b.txt", "utf-8", read) // Asynchronously
console.log("Done!")

*/


function timeout(){
    console.log("click the button")
}

console.log("HI");

setTimeout(timeout, 5000); // I/O intensive task

console.log("Welcome to Loupe");

let c = 0;
for(let i=0; i<10000000000; i++)  // CPU intensive task
    c=c+1;

console.log("Expensive operation done")