const express = require("express");

const app = express();

app.use(express.json());

const users = []; // in memory data

// should return a random long string
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
        'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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
        const token = generateToken();
        founduser.token = token;
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
    const token = req.headers.token
    let foundUser = null;

    for(let i=0; i<users.length; i++){
        if(users[i].token == token){
            foundUser = users[i]
        }
    }

    if(foundUser){
        res.json({
            userName: foundUser.userName,
            password: foundUser.password
        })
    } else {
        res.json({
            message: "token invalid"
        })
    }
}

app.post('/sign-up', signUp)

app.post('/sign-in', signIn)

app.get('/me', myDetails)

app.listen(3600);