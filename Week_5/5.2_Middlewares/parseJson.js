const express = require("express");

const app = express();

// middleware to parse the JSON data - it is an external middleware by express
app.use(express.json());

app.post('/add', function(req, res){
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    res.json({
        ans: a+b
    })
})

app.listen(3502)