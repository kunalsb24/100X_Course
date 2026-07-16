const express = require("express");

const app = express();

//function that returns a boolean if the age of person is more than 14
// function isOldEnough(age){
//     if(age >= 14){
//         return true;
//     } else {
//         return false;
//     }
// }

// app.use(isOldEnoughMiddleware); // use this middleware for every route in the app or we can use it as below

function isOldEnoughMiddleware(req, res, next){
    const age = req.query.age;
    if(age >= 14){
        next();
    } else {
        res.json({
            msg: "Sorry you are not old enough"
        })
    }
}

app.get('/ride1', isOldEnoughMiddleware, function(req, res){ 
        res.json({
        msg: "You have successfully rode ride 1"
      })
})

app.get('/ride2', isOldEnoughMiddleware, function(req, res){ 
        res.json({
        msg: "You have successfully rode ride 2"
      })
})

app.listen(3301);