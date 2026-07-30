const  {Router} = require("express");
const userRouter = Router();

userRouter.get('/sign-up', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

userRouter.get('/sign-in', function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

userRouter.get('/purchases', function(req,res){
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}