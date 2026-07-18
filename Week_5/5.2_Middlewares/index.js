const express = require("express");

const app = express();

// Task 1: Create a middleware function that logs each incoming request's 
// HTTP method, URL, and timestamp to the console.

//Task 2: Create a middleware that counts the total number of requests sent to the server. 
// Also create an endpoint that exposes it.

function loggerMiddleware(req, res, next){
    console.log("Method is: "+ req.method);
    console.log("Route is: "+ req.url);
    console.log(new Date());

    next();
}

let requestCount = 0;

// Counter Middleware
function countRequests(req, res, next) {
    requestCount++;
    next();
}

// Apply middleware globally
app.use(countRequests);

app.use(loggerMiddleware);

app.get('/multiply', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({
        ans: a*b
    })
})

app.get('/add', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({
        ans: a+b
    })
})

app.get('/divide', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({
        ans: a/b
    })
})

app.get('/subtract', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({
        ans: a-b
    })
})

app.listen(3501);
