const  {Router} = require("express");
const { UserModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");

const userRouter = Router();

userRouter.post('/sign-up', async function(req, res){
    const { email, password, firstName, lastName } = req.body; // TODO: Adding zod validation
    // TODO: hash the password so plaintext pw is not stored in db

    // Put inside try catch block
    await UserModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message: "User Signup succeeded"
    })
})

userRouter.post('/sign-in', async function(req,res){

    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email,
        password
    });

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token,
            message: "You are successfully signed-in"
        })
    } else {
        res.status(403).json({
        message: "Incorrect user Credentials"
    })
    }    
})

userRouter.get('/purchases', function(req,res){
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}