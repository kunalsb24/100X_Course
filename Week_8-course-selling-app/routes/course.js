const  {Router} = require("express");
const courseRouter = Router();

courseRouter.get('/purchase', function(req, res){
    res.json({
        message: "purchase endpoint"
    })
})

courseRouter.get('/preview',function(req,res){
    res.json({
        message: "course-preview endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}