const express = require("express");
const app = express();

//route handlers

app.get('/', function(req, res){
    res.send('Hello World')
})

app.get('/home', function(req, res){
    res.send('<h1>Hello from Home Page</h1>')
})

app.listen(3001)
