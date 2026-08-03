const  {Router} = require("express");
const { userMiddleware } = require("../middlewares/user")
const { PurchaseModel, CourseModel } = require("../db");
const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async function(req, res){
    const userId = req.userId;
    const courseId = req.courseId;

    await PurchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "Successfully purchased course"
    })
})

courseRouter.get('/preview', async function(req,res){

    const courses = await CourseModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}