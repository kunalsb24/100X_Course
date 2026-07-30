const { Router } = require("express");
const adminRouter = Router();
const {AdminModel} = require("../db");

adminRouter.post('/sign-up', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/sign-in', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/course', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put('/sign-up', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get('/course/bulk', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}


