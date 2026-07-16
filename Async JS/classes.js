// class Rectangle {
//     constructor(width, height, color){
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }

//     area(){
//         const area = this.width * this.height;
//         return area;
//     }

//     paint(){
//         console.log(`Painting with color: ${this.color}`);
//     }
// }

// const rect = new Rectangle(2,4,"red");
// const area = rect.area();

// console.log(area)
// rect.paint();

//------------------------------------------------------------------------------------------------------//

// Inheritance

// JS built-in classes

// 1. Date class

// const now = new Date();
// console.log(now.getFullYear());
//-----------------------------------------------------------------------------------------------//
// 2. Map class

// const map = new Map();
// map.set("name", "Alice");
// map.set('age', 30);
// console.log(map.get('name'));
// console.log(map.get('age'));

//---------------------------------------------------------------------------------------------------------------//
// 3. Promise class

// Defining  a promise is hard
// using a promise is easy.

// function setTimeoutPromisified(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// function callback() {
// 	console.log("3 seconds have passed");
// }

// setTimeoutPromisified(3000).then(callback)

// let p = setTimeoutPromisified(3000)
// console.log(p)

// ---------------------------------------------------------------------------------------------------//

//// Create the promisified version of fs.readFile(), fs.wirteFile(), cleanFile


//// Promisified fs.readFile()
// Defining a promise

/*
const fs = require("fs");

function readTheFile(resolve){
    fs.readFile('a.txt', 'utf-8', function(err, data){
        resolve(data);
    })
}

function readFilePromisified(fileName){
    return new Promise(readTheFile);
}

// Using a promise
const p = readFilePromisified();

function callback(contents){
    console.log(contents);
}

p.then(callback)

*/



// ------------------------------------------------------------------

/*
const fs = require("fs");

console.log("----------Top of the file------------")

function readTheFile(resolve){
    console.log("readTheFile is called");
    setTimeout(function(){
        console.log("callback based setTimeout completed");
        resolve();
    }, 3000);
}

function setTimeoutPromisified(fileName){
    console.log("setTimeoutPromisified called")
    return new Promise(readTheFile);
}

const p = setTimeoutPromisified();

function callback(){
    console.log("Timer is done");
}

p.then(callback);

console.log("----------end of the file---------------");
*/
//-------------------------------------------------------------------------------


function doAsyncOp(resolve)
    {setTimeout(resolve, 3000);}


function setTimeoutPromisified(){
    return new Promise(doAsyncOp)
}

const p = setTimeoutPromisified();

function callback(){
    console.log("Hey callback is called");
}

p.then(callback)


// ----------------------------------------------------------------------------

