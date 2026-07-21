const express = require("express");

const jwt = require("jsonwebtoken")
const JWT_SECRET = "Kunal@123"

const app = express();

app.use(express.json());

const users = []; // in memory data

function signUp(req, res){
    const userName = req.body.userName;
    const password = req.body.password;

    users.push({
        userName: userName,
        password: password
    })

    res.json({
        message: "You are signed up"
    })

    console.log(users)
}

function signIn(req, res){
    const userName = req.body.userName;
    const password = req.body.password;

    let founduser = null;

    for(let i=0; i<users.length; i++){
        if(users[i].userName === userName && users[i].password === password){
            founduser = users[i]
        }
    }
   
    // OR
    // const user = users.find(user => user.username === username && user.password === password);

    if(founduser){
        const token = jwt.sign({
            userName: userName
        }, JWT_SECRET); // converts username to jwt

        // founduser.token = token;
        // user.token = token
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

    console.log(users)
}

function myDetails(req, res){   
    
    let foundUser = null;

    for(let i=0; i<users.length; i++){
        if(users[i].userName == req.userName){
            foundUser = users[i]
        }
    }

    if(foundUser){
        res.json({
            userName: foundUser.userName,
            password: foundUser.password
        })
    } 
}

// creating a middleware called auth that verifies if a user is logged 
// in and ends the request early if the user isn’t logged in
function auth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if(decodedData.userName){
        req.userName = decodedData.userName;
        next();
    } else {
        res.json({
            message: "You are not logged in"
        })
    }

    next();
}

app.post('/sign-up', signUp)

app.post('/sign-in', signIn)

app.get('/me',auth, myDetails)

app.listen(3602);