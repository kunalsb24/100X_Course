const express = require("express");

const app = express();

app.get('/multiply', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(a*b);
})

app.get('/add', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(a+b);
})

app.get('/divide', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(a/b);
})

app.get('/subtract', function(req, res){
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(a-b);
})

app.listen(3500);
